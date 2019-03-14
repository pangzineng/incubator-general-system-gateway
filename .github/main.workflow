workflow "build and push image" {
  on = "push"
  resolves = ["one-click-docker"]
}

action "one-click-docker" {
  uses = "pangzineng/Github-Action-One-Click-Docker@master"
  secrets = ["DOCKER_NAMESPACE", "DOCKER_PASSWORD", "DOCKER_USERNAME", "DOCKER_REGISTRY_URL"]
  env = {
    BRANCH_FILTER = "master"
  }
}
