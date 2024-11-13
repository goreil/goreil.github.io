+++
title = 'Attaching a new container to a running docker container'
date = 2024-10-30T11:13:49+01:00
draft = false
+++

# Can't install mysql-server in Docker

Imagine you setup your favorite debian unstable Docker container and want to install `mysql-server` but the computer says no:

![Computer says no](/images/attach_docker/no.png)

What now?

At this point you have the following options:
1. Fix dependency issues (ugh)
2. Try to install it with snap (doesn't work)
3. Spin up a docker in docker (Blasphemy!)
4. Lie down and cry (this won't fix it silly)

But what if I told you there is a fifth option?

# Introducing: Docker next to docker

Instead of crying, you can just create another docker container and
attach them to the same network.

This can be achieved with
```bash
docker network create shared-network-name
docker network connect shared-network-name old-container-name
docker run  --network shared-network-name --rm --name=mysql -e MYSQL_RANDOM_ROOT_PASSWORD=1 mysql
```

The IP address of the new container can be shown via
```bash
docker inspect mysql -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}'
172.19.0.3
```

Using the correct password, you can now connect to your mysql DB
```
mysql -u root -h 172.19.0.3 -p
```
![Success](/images/attach_docker/success.png)

## Bonus: Exposing port on original docker network

In case you have a local VPN connection on the host docker, i.e. 
when playing Vulnlab or HackTheBox.
You can just build a `socat` tunnel to expose the mysql port:
```
socat tcp-listen:3306,reuseaddr,fork tcp:172.19.0.3:3306
```