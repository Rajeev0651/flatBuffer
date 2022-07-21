Designing schema
Inside '/root' directory of filename 'monster.fbs' create any schema

Compiling schema
You must have Flatbuffer compiler 'flatc', if not follow these links to built 'flatc'
1. https://stackoverflow.com/questions/55394537/how-to-install-flatc-and-flatbuffers-on-linux-ubuntu
2. https://google.github.io/flatbuffers/flatbuffers_guide_building.html

Once flatc is built successfully, compile the schema:
flatc --ts monster.fbs
# customize your TS -> JS transpilation
tsc monster.ts

Creating buffer file
Inside /root/app/ directory run command: 'node app.js'
After successfully run it create .bin file in same directory.

Reading binary file
Inside /root/app directory run command: 'node readFile.js'