#!/bin/bash

POST_TITLE=$1
DATE_STRING=`date +"%Y-%m-%d %H:%M"`
LOWER_UNDERSCORE_TITLE=`echo $POST_TITLE | sed -e 's/ /_/g' | awk '{print tolower($0)}'`

sed -e "s/%POST_TITLE%/$POST_TITLE/g" post_template.md > /tmp/temp_template.md
sed -e "s/%POST_DATE%/$DATE_STRING/g" /tmp/temp_template.md > /tmp/newer_template.md

mkdir "contents/articles/$LOWER_UNDERSCORE_TITLE"
cp /tmp/newer_template.md "contents/articles/$LOWER_UNDERSCORE_TITLE/index.md"