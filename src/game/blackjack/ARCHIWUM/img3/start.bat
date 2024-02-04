@echo off
setlocal enabledelayedexpansion

set "sourceImage=C:\Users\Neo\Desktop\WWW\react\skynet\skynet\src\game\blackjack\img\empty-card.png"
set "destinationFolder=C:\Users\Neo\Desktop\WWW\react\skynet\skynet\src\game\blackjack\img"

for /L %%i in (1, 1, 54) do (
    set "destinationFile=!destinationFolder!\card%%i.png"
    copy "!sourceImage!" "!destinationFile!" >nul
    echo Copied !sourceImage! to !destinationFile!
)

echo Copying complete.
