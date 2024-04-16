Deploying on AWS Elastic Compute Cloud (EC2)

Step 1: Launch an Ubuntu Linux EC2 image

Step 2: When the ec2 instance is done initalizing, obtain its Public IPv4 DNS name and insert it as follows to the project:
    You may need to show hidden files to be able to see the ".env" file
    a. In the api/.env file replace the text FRONT_END_DOMAIN with the IPv4 DNS name
    b. In the web/.env file look for the VITE_BACKEND_DOMAIN entry and paste the Public IPv4 DNS name after the equal sign
    c. Create a free mail trap account and create a new project.
        Locate the settings of the created app and select 'django' from the 'integration' settings selection field.
        Copy the provided environment settings and paste at the end of 'api/.env' file below SECRET_KEY entry

Step 3: Create a github repository and push the content of this project to it.

Step 2. Connect to the EC2 instance via ec2 instance connect and run the following commands to install docker and docker-compose
    sudo apt-get update
    sudo apt-get install docker.io
    sudo apt-get install docker-compose
    
Step 3: Clone the github reposiroty of the project to this ec2 instance. Replace <repository-url> with the url or your repository
	i.e git clone <repository-url> app

Step 4: Navigate into the cloned repository.
    i.e cd app

Step 3. Launch the application
    sudo docker-compose up
