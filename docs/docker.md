```markdown
docker build .
// follow the dockerfile steps to run command
writing image sha256:8e10eb95a // IMAGEID

export PATH=$PATH:/Applications/Docker.app/Contents/Resources/bin
// run if docker exe not in $PATH

docker run [IMAGEID]
// build image by ImageId
docker build -t [dockerUserName]/[nameService] .     // DockerId/ProjName
// build image by tag

docker run [dockerUserName]/[imageName]
// create and start container, based on the provided imageId or tag

docker run shuweic227/posts [CMD]
// create and start container, Override the default command

docker ps
// print out information about all of the running containers

docker logs [ContainerId]
// print out information about givin container

docker run -dp 5173:5173 [ImageName] // for my case: shuweic227/soc_init
// run image with port set

// final step: go for localhost:5173

docker ps -a --filter "ancestor=shuweic227/soc_init"
// list all containers with ancestor image

docker stop [ContainerId]
// kill container base on id

```
