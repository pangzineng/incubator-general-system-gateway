workflow "build and push image" {
  on = "push"
  resolves = [
    "push",
  ]
}

action "master" {
  uses = "actions/bin/filter@d820d56839906464fb7a57d1b4e1741cf5183efa"
  args = "branch master"
}

action "login" {
  uses = "actions/docker/login@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  needs = ["master"]
  secrets = ["DOCKER_USERNAME", "DOCKER_PASSWORD", "DOCKER_REGISTRY_URL"]
}

action "build" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  needs = ["login"]
  args = "build -t $IMAGE_NAME ."
  env = {
    IMAGE_NAME = "gsg-general"
  }
}

action "tag" {
  uses = "actions/docker/tag@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  needs = ["build"]
  args = "$IMAGE_NAME $DOCKER_REGISTRY_URL/$DOCKER_NAMESPACE/$IMAGE_NAME:$GITHUB_SHA --env"
  secrets = [
    "DOCKER_REGISTRY_URL",
    "DOCKER_NAMESPACE",
  ]
  env = {
    IMAGE_NAME = "gsg-general"
  }
}

action "push" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  needs = ["tag"]
  args = "push $DOCKER_REGISTRY_URL/$DOCKER_NAMESPACE/$IMAGE_NAME:$GITHUB_SHA"
  secrets = ["DOCKER_REGISTRY_URL", "DOCKER_NAMESPACE"]
  env = {
    IMAGE_NAME = "gsg-general"
  }
}
