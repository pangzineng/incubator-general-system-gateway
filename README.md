# Introduction

It's a simple web server that sit between ui and server to decouple the database schema & operation endpoint.

It's the gateway part of the 3 part general data management system
- **ui**: https://github.com/pangzineng/incubator-general-operation-ui
- **gateway**: https://github.com/pangzineng/incubator-general-system-gateway
- **server**: https://github.com/pangzineng/incubator-general-task-distribution-system

# Setup

Follow the [example](./example/general) starting at `run.sh` to see how the docker image was built, ran and then the profile data were injected manually (yes it's done manually, because it's a very simple system)

You can skip the docker build step and just use an existing docker image: https://hub.docker.com/r/pangzineng/incubator-general-system-gatway