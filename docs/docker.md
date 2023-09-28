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

docker run -p 80:3000 [imageName]
// run image with port set
```
