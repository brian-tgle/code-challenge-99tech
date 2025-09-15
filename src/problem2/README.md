## Setup submodule
In case you did not know how to clone a specific folder in a public repo to our repo as a submodule.
Here is the step
```
git submodule add https://github.com/Switcheo/token-icons.git src/problem2/src/assets/token-icons
cd src/problem2/src/assets/token-icons
git sparse-checkout init --cone
git sparse-checkout set tokens
cd ../../../..
echo "/tokens/" >> .git/modules/src/problem2/src/assets/token-icons/info/sparse-checkout
rm -rf src/problem2/src/assets/token-icons
```

## How to run
- Clone submodule at the 1st time
```
git submodule update --init --recursive
```
- Install required dependencies
```
npm install
```
- Start the project
```
npm run dev
```
