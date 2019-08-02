#!groovy

import nf.BuildProperties.BuildProperties

// name of project to build, should match the produced executable
String project = 'LoanPledgingTool'
// AWS region to operate within
String region = 'us-west-2'
// target ECR hostname
String ecr = "739861173471.dkr.ecr.${region}.amazonaws.com"
// ECR repository path
String repo_short = project.replace('.', '/').toLowerCase()
// full ECR repository URL
String repo_full = "${ecr}/${repo_short}"
// Jenkins credentials profile for interfacing with AWS (must be pre-configured in Jenkins)
String aws_credentials = "QB-IAM"
// Docker image to use for managing deployments to ECS
String ecs_deploy_image = "fabfuel/ecs-deploy"
// Type of cluster for deployment (either "linux" or "windows")
String ecs_cluster_type = "linux"
// ECS service name prefix (will be suffixed with environment)
String ecs_service_prefix = project
// nuget source URLs
String[] nuget_sources = [
    "https://api.nuget.org/v3/index.json",
    "https://app.nationalfunding.com:6443/v3/index.json"
]
// nuget source URL string for use in dotnet commands (do not modify this one)
String nuget_source_string = "--source ${nuget_sources.join(' --source ')}"
// whether or not to execute the unit test stage
Boolean unit_tests_enabled = false
// BuildProperties object for persisting data across stages
def props = new BuildProperties(project)

pipeline {
    agent {
        node { label 'linux' }
    }
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        skipDefaultCheckout()
    }
    parameters {
        booleanParam(name: 'ALLOW_REBUILDS', defaultValue: false, description: 'Allow rebuild of a previous successfully built commit ref')
    }
    stages {
        stage('Checkout') {
            steps {
                setCurrentStage props, 'checkout'
                // checkout source code, determine version being build, update currentBuild displayName and description
                checkoutGit props, true
                // check if commit has been built before, and abort if so (unless ALLOW_REBUILDS = true)
                verifyCommitIsNew props
            }
        }
        stage('Unit Test') {
            when { expression { return unit_tests_enabled } }
            steps {
                setCurrentStage props, 'unittest'
                sh "docker run --rm -v /etc/passwd:/etc/passwd:ro -v ${WORKSPACE}:/test --workdir /test ${defaults.dotnetCoreSDKImage} bash -c 'dotnet restore ${nuget_source_string} && dotnet test -c Release -r /test/results --logger:trx; RETVAL=\$?; chown -R jenkins /test; ls -l /test/results; exit \$RETVAL'"
            }
            post {
                always {
                    configFileProvider([configFile(fileId: 'mstest_to_junit.xsl', targetLocation: 'mstest_to_junit.xsl')]) {
                        sh "xsltproc -o results.xml mstest_to_junit.xsl results/*.trx"
                    }
                    step([$class: 'JUnitResultArchiver', allowEmptyResults: false, testResults: 'results.xml'])
                }
            }
        }
        stage('Package') {
            steps {
                setCurrentStage props, 'package'
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: aws_credentials, secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                    sh "\$(aws ecr --region ${region} get-login --no-include-email)"
                    sh "docker build --pull --label 'type=serviceimage' -t ${repo_full}:${props.buildType} -t ${repo_full}:${props.gitVersion} --build-arg NUGET_SOURCES='${nuget_source_string}' --build-arg app=${project} --build-arg SDK_IMAGE=${defaults.dotnetCoreSDKImage} ."
                }
            }
            post {
                success {
                    // push a new version tag if necessary
                    pushGitVersionTag props
                }
            }
        }
        stage('Publish') {
            steps {
                setCurrentStage props, 'publish'
                // push the Docker image to a registry
                pushDockerImage props, ecr, repo_short, region, [credentials:aws_credentials]
            }
        }
        stage('Deploy') {
            when {
                not { branch 'feature/*' }
            }
            steps {
                setCurrentStage props, 'deploy'
                // use custom fargate deploy job
                deployToECSFargate props, ecs_cluster_type, ecs_service_prefix, region, aws_credentials
            }
            post {
                success {
                    milestone label: "EndOfDeploy_${props.applicationName}_${props.buildType}", ordinal: 100
                }
            }
        }
    }
    post {
        success {
            // clean up workspace
            deleteDir()
        }
        always {
            // send a notification via slack, and if there was a failure send an email as well
            sendNotifications props, 'qbf--QB_slack--#cicd'
        }
    }
}
