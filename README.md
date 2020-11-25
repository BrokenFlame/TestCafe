# Instruction for CentOS 8

## Install NodeJs

```sh
sudo yum -y install curl
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -

sudo yum install -y nodejs
```

## Install FireFox
```sh
sudo yum install firefox -y
```

Install Chrome
```sh
sudo -i
wget https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm
yum install ./google-chrome-stable_current_*.rpm -y
exit
```

## Install Visual Studio Code: 

```sh
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'

sudo chmod 0644 /etc/yum.repos.d/vscode.repo

sudo dnf check-update
sudo dnf install code

```

## Create a new project and install TestCafe

```sh
PROJECT_NAME=<Project Name>
mkdir $PROJECT_NAME
cd $PROJECT_NAME/
npm init --yes
npm install testcafe --save-dev
```

## Configure the TestCafe Project
Create a basic configuration file for TestCafe named ".testcaferc.json" which should look something similar to the json below:

```json
{
	"browsers": ["firefox"],
	"src": [
		"tests/**/*.js",
		"tests/**/*.feature"
	],
	"screenshots": {
		"path": "tests/screenshots/",
		"takeOnFails": true,
		"pathPattern": "${DATA}_${TIME}/test-${TEST_INDEX}/${USERAGENT}/${FILE_INDEX}.png"
	},
	"quarantineMode": false,
	"stopOnFirstFail": true,
	"skipJsErrors": true,
	"skipUncaughtErrors": true,
	"concurrency": 1,
	"selectorTimeout": 3000,
	"assertionTimeout": 1000,
	"pageLoadTimeout": 1000,
	"disablePageCaching": true
}
```

## Create the tests folder
Create a folder named "tests" within the project to house all of the test documents (files).

```sh
mkdir tests
```

## Create a Sample Test
Create a sample test to check that every thing is working correctly.

```sh
cat <<'EOF' > $PROJECT_NAME/sample_test.js
const { Selector } = require('testcafe');

fixture ('First Test Set').page('http://demo.redmine.org/');

test('My first test', async (t) => {

    }
);
EOF
```

## Run the sample test.
Run the sample tests, and check the out output is okay. 1 Test should pass, none should fail.

In Visual Studio Code, open the Project Folder.  Then open a new Terminal, and provide the following command to the terminal. *FireFox will launch and then close when the test is complete.*

```sh
npx testcafe
```

You can also append the brower name to the end of the command, to select a specific broswer, i.e. npx testcafe chrome.
