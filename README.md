
</br>
<p align="center">
    <img  src="https://i.imgur.com/HTqL6jV.png" alt="Better-U logo"/>
</p>

<!-- GETTING STARTED -->
## Getting Started
<i>This is the api for [this project]. Check it out first if you haven't seen it yet.</i>


To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/jonasbaek/better-u-api.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter environment variables on .env
   ```js
    MONGODB_URI="mongodb+srv://jonasbaek:exhoSjeZjFeKd5Da@cluster0.pp8vtjf.mongodb.net/?retryWrites=true&w=majority"
    SECRET_JWT = "95051e3cbcd944c64b08d9fc6946d8bf"
   ```
MONGODB_URI is used to perform the connection with mongodb
</br>

After installation, <b>you must run [this project] on port 3001 and then the current project on port 3000.</b>
</br>
Then, run the development server: 
   ```js
   npm run dev
   ```
If the installation and initialization are successful, the following message should be appearing in the log: 
   ```js
   Server running on port: 3000
   Connected to MongoDB
   ```
   
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[this project]: https://github.com/jonasbaek/better-u


