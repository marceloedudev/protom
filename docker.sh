#!/bin/bash

excludeDirectoriesList=(".github/" "docs/" "deployments/")
allFilenamesList="$(ls -d */)"
allFilenamesListNormalized=$allFilenamesList

for entry in "${allFilenamesList[@]}"; do
    for item in ${excludeDirectoriesList[@]}; do
        if [ "${item}" != "${entry}" ]; then
            unset $entry
        fi
    done
done

for entry in $allFilenamesListNormalized; do
    countDirectories="$(ls ./${entry} | wc -l)"
    if [ "${countDirectories}" != "0" ]; then
        if [[ -f "./${entry}/docker-compose.yml" || -f "./${entry}/docker-compose.yaml" ]]; then
            echo "* $entry - $countDirectories"
            cd ./$entry
            docker compose $1
            sleep 10
            cd ..
        fi
    fi
done

docker ps -a
