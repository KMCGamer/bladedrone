#!/bin/bash

read -p "Drop the database? (Y/N)" yn
    case $yn in
        [Yy]* ) mongorestore --drop --db bladedrone ./dump/bladedrone/;;
        [Nn]* ) mongorestore --db bladedrone ./dump/bladedrone/;;
        * ) echo "Please answer yes or no.";;
    esac
