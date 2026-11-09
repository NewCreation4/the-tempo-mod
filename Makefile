DEST = ..
NAME = the-tempo-mod
IGNORE = .git/\* Makefile /**/*.txt .gitignore

all:
	zip $(NAME).zip . -r -x $(IGNORE)
	mv $(NAME).zip $(DEST)

# For testing in mobile with Termux
