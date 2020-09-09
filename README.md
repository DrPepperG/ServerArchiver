# Server Archiver
I originally created this to simply archive some minecraft worlds every night at 1 am, it took me a bit to figure out how to exactly get this program to work correctly.
At the beginning I attempted to use the `tar` package but that never ended up working correctly so I opted to just have javascript run bash for me.
Sure there is probally many better ways to do this but this is the one that ended up working for my use case, I wish I could of used crontab but it wouldn't work either.

# How it works
Paths are configured at the top of the script with the desired file name and then desired folder paths, they are then converted into strings and then executed by bash.
Backups are then saved into the supplied folder which by default is the backups folder in this script. There is also a backup expire configured in days by the var `daysToLive`,
I haven't fully tested if the expire script works or not so we will see.

# Installation
Run `npm install`

# Tested Environments
**Ubuntu 18.04**

**Node 12.18.3**
