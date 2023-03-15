#!/bin/bash

# display mime type
# for file  in ./.output/public/_nuxt/* ; do file -Iz --mime-type "$file"; done

# Update MIME types for all .js and .css files in ./output/ and its subdirectories
find ./.output/ -type f \( -name "*.js" -o -name "*.css" \) -print0 | while read -d $'\0' file
do
  mimetype=$(file -b --mime-type "$file")
  # if [[ $mimetype != "text/javascript" && $mimetype != "text/css" ]]; then
  #   echo "Updating MIME type for $file"
  #   sudo /usr/bin/env xattr -w "com.apple.metadata:kMDItemContentType" "public.$mimetype" "$file"
  # fi
  if [[ $mimetype == "text/x-java" ]]; then
    echo "Updating MIME type for $file"
    echo "From: "
    file -Iz --mime-type "$file"
    sudo /usr/bin/env xattr -w "com.apple.metadata:kMDItemContentType" "public.text/javascript" "$file"
    echo "To: "
    file -Iz --mime-type "$file"
  fi
done