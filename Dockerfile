# intermediate container for build
ARG SDK_IMAGE
FROM $SDK_IMAGE as build-env

# build args
ARG NUGET_SOURCES="--source https://api.nuget.org/v3/index.json"

# add the content
WORKDIR /build
COPY . ./

# we need nodejs for npm, attempt to install
# XXX we need to not randomly download a bash file and run it, fix this eventually...
RUN curl -sL https://deb.nodesource.com/setup_10.x |  bash -
RUN apt-get install -y nodejs

# compile/package the app
RUN dotnet publish $NUGET_SOURCES -c Release -r linux-x64 -o /out \
    && rm -f /out/NLog.config

ENV TEMP=`pwd`
run echo `pwd`
RUN cd /out/ClientApp
run echo `pwd`
RUN npm install
RUN cd $TEMP
RUN echo `pwd`

# actual target image
FROM 739861173471.dkr.ecr.us-west-2.amazonaws.com/baseimage/core:stable

# metadata
MAINTAINER Matt Sheppard <msheppard@nationalfunding.com>
LABEL type='serviceimage'

# common environment variables
ARG app="undefined"
ENV APPLICATION=$app

# copy app from build-env
RUN echo "current directory `pwd`"
COPY --from=build-env /out .

# add custom nginx config
COPY .docker/nginx-lpt.conf /etc/nginx/conf.d/lpt.conf

# default command
CMD ./$APPLICATION
