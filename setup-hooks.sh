#!/usr/bin/env sh
rm -f .git/hooks/pre-commit
ln -s ../../utils/hooks/pre-commit .git/hooks/pre-commit
