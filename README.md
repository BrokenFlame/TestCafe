# TestCafe 
This Repo is to provide both prebuilt tests/tests snippets to help DevOps Engineers to test application deployments. It is also a useful learning resource for anyone who would like to learn TestCafe.

I have chosen to use TestCafe on CentOS 8 for in brower testing and Node containers for Chome headless testing.

## Instruction for CentOS 8
Below are instruction on how to setup TestCafe on CentOS 8. It is recommended that you complete all steps and do not skip ahead. 

### Install NodeJs

```sh
sudo yum -y install curl
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -

sudo yum install -y nodejs
```

### Install FireFox
```sh
sudo yum install firefox -y
```

### Install Chrome
```sh
sudo -i
wget https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm
yum install ./google-chrome-stable_current_*.rpm -y
exit
```

### Install Visual Studio Code: 

```sh
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'

sudo chmod 0644 /etc/yum.repos.d/vscode.repo

sudo dnf check-update
sudo dnf install code

```

### Create a new project and install TestCafe
Replace "\<Project Name\>" with the name of your project.
```sh
PROJECT_NAME=<Project Name>
mkdir $PROJECT_NAME
cd $PROJECT_NAME/
npm init --yes
npm install testcafe --save-dev
```

### Configure the TestCafe Project
In your project directory, create a basic configuration file for TestCafe named ".testcaferc.json". The contents of the file should look something similar to the json below:

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

### Create the tests folder
Create a folder named "tests" within the project to house all of the test documents (files).

```sh
mkdir tests
```

### Create a Sample Test
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

### Run the sample test.
Run the sample tests, and check the out output is okay. 1 Test should pass, none should fail.

In Visual Studio Code, open the Project Folder.  Then open a new Terminal, and provide the following command to the terminal. *FireFox will launch and then close when the test is complete.*

```sh
npx testcafe
```

You can also append the brower name to the end of the command, to select a specific broswer, i.e. npx testcafe chrome.

### Install the HTML reporter.
Many reporters for Testcafe are available, it ships with "spec", "json", "xunit" etc. You can find additional reporters in npm searching for "testcafe-reporter-". To install the html report use:

```sh
npm install testcafe-reporter-html --save-dev
````
To execute a specific reporter ammend the configuration file. Or use the --reporter switch:

```sh
npx testcafe chrome --reporter json

npx testcafe chrome --reporter html:report.html
```
### It is useful to run a subset of tests based on the meta data using either the --test-meta or --fixture-meta switches as shown below:

```sh
npx testcafe chrome --test-meta type=minimal
```
