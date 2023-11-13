# Instruction: run with Docker

Music++ docekr documents  
For any question about docker image, please contact:
Shuwei Cui: cuicoms@iastate.edu

# Running with Docker

This guide provides step-by-step instructions on how to run our project using Docker.

## Prerequisites

- Docker installed on your system. [Download Docker](https://www.docker.com/get-started)

  check if you got docker installed correct:

  ```bash
  docker
  // should print out the command and info of docker
  ```

- Docker Compose (if using) [Download Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### 1. Clone the repository

```bash
git clone [repository_url]
cd [repository_name]
// make sure you are under the folder that contain Dockerfile
```

### **2. Build the Docker Image**

Replace **`[image_name]`** with a name for your Docker image.

```bash
bashCopy code
docker build -t [image_name] .
// tips: the common name is [accountName/image_name] (shuweic/soc_test)
// don't forget the . after image_name
```

### **3. Run the Docker**

1. Run with port 5173

   Docker is gonna create a container for you when you are not run with concrete container

```bash
docker run -p 5173:5173 -d [image_name]
```

1. Run with container (Optional)

Replace **`[container_name]`** with a name for your Docker container.

```bash
bashCopy code
docker run -d --name [container_name] [image_name]
```

1. Other common command (Optional)

   - Override the default command

   ```bash
   	docker run [image_name] [CMD]
   ```

   - print out the infomation about all the running docker image

   ```bash
   	docker ps
   ```

   - print out infomation about givin container

   ```bash
   	docker logs [container_id]
   ```

   - Override the default command

   ```bash
   	docker run shuweic227/posts [CMD]
   ```

## **Using Docker Compose (Optional)**

If the project includes a **`docker-compose.yml`** file, you can use Docker Compose to manage multi-container applications.

### **1. Start Services**

```bash
bashCopy code
docker-compose up -d

```

### **2. Stop Services**

```bash
bashCopy code
docker-compose down

```

## **Common Docker Commands**

- **View running containers**: **`docker ps`**
- **Stop a container**: **`docker stop [container_name or container_id]`**
- **Remove a container**: **`docker rm [container_name or container_id]`**
- **View local images**: **`docker images`**
- **Remove an image**: **`docker rmi [image_name or image_id]`**

## **Troubleshooting**

- Ensure Docker daemon is running: **`systemctl status docker`**
- Check Docker logs: **`docker logs [container_name or container_id]`**

## **Conclusion**

Docker provides a consistent and reproducible environment for our project. Feel free to explore further and optimize the Docker setup as needed.
