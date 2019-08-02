# intermediate container for build
ARG SDK_IMAGE
FROM $SDK_IMAGE as build-env

# build args
ARG NUGET_SOURCES="--source https://api.nuget.org/v3/index.json"

# add the content
WORKDIR /build
COPY . ./

# we need nodejs for npm, attempt to install
RUN apt-get install -y nodejs

# compile/package the app
RUN dotnet publish $NUGET_SOURCES -c Release -r linux-x64 -o /out \
    && rm -f /out/NLog.config

# actual target image
FROM 739861173471.dkr.ecr.us-west-2.amazonaws.com/baseimage/core:stable

# metadata
MAINTAINER Matt Sheppard <msheppard@nationalfunding.com>
LABEL type='serviceimage'

# common environment variables
ARG app="undefined"
ENV APPLICATION=$app

# copy app from build-env
COPY --from=build-env /out .

# default command
CMD ./$APPLICATION
