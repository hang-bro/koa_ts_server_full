@echo off
chcp 65001
set "name="
if "%1"=="" (
  set  name=huangyuhang
) else (
   set name = %1
)
echo %name%

git log --since="8:30" --until="17:30" --no-merges --author=%name% --pretty=format:"%%%s" > git提交记录.txt
setlocal EnableDelayedExpansion
set "file_contents="
for /F "usebackq tokens=* delims=" %%a in ("git提交记录.txt") do (
    set "file_contents=!file_contents!%%a"
)
echo File Contents:
echo !file_contents!
@set /P "_=%file_contents%"<NUL|clip 
timeout 1 > nul
del "git提交记录.txt"