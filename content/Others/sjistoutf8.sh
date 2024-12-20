#!/bin/bash

find . -type f -iname "*.csv" -or -iname "*.erb" | while read file; do
    encoding=$(nkf -g "$file")
    if [ "$encoding" = "Shift_JIS" ]; then
        nkf -w --overwrite "$file"
    fi
done