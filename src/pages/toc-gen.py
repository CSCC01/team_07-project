"""Markdown Table Of Content Generator

2019 March 27

Usage: $ python3 toc-gen.py filename.md

- In the markdown file, to generate toc for the first time, put this special tag
`<toc>` at where you want the toc to be.

- There will be tags around the table of content, starting with `<!-- TOC -->`, ending
with `<!-- /TOC -->`, so it can be updated overtime.

- Only sections created using hashtags (#, ##, ###, etc) will be recognized.

- If there is only one h1 section (i.e. The section starts with one hashtag),
it will be ignored. This ensures that the biggest title will not be captured
and occupies extra space.

- Use `<tocignore>` and `</tocignore>` tags to prevent some part of the markdown
appearing in the toc.
"""

import re
import sys

string_to_replace_pattern = r"<!-- TOC -->(.*\n)((.*\n)*)<!-- /TOC -->"


def generateTOC(filename):
    contents = []
    with open(filename, "r") as ins:
        toc_ignore_flag = False
        for line in ins:
            if "<!-- TOC -->" in line or "<tocignore>" in line:
                toc_ignore_flag = True
            if "<!-- /TOC -->" in line or "</tocignore>" in line:
                toc_ignore_flag = False
            if toc_ignore_flag:
                continue

            searchObj = re.search(r'(#+)\ (.+)', line, re.M | re.I)
            if searchObj:
                temp = {}
                level = len(searchObj.group(1))
                if (level >= 1):
                    temp["level"] = level
                    temp["text"] = searchObj.group(2)
                    temp["link"] = "#" + \
                        searchObj.group(2).replace(" ", "-").lower()
                    contents.append(temp)

    if len(contents) == 0:
        print("Unable to find suitable contents in the markdown file. This could be caused by the missing `<!-- /TOC -->`.")

    number_of_level_one = 0
    for content in contents:
        if content['level'] == 1:
            number_of_level_one += 1

    indent_offset = 1
    if number_of_level_one <= 1:
        indent_offset = 2
        for i in range(len(contents)):
            if contents[i]['level'] == 1:
                del contents[i]
                break

    toctext = "<!-- TOC -->\n\n"
    for item in contents:
        indent_text = (item['level'] - indent_offset) * '    '
        line = f"{ indent_text }- [{ item['text'] }]({ item['link'] })\n"
        toctext += line
    toctext += "\n<!-- /TOC -->\n"

    filecontents = ""
    with open(filename, 'r') as myfile:
        filecontents = myfile.read()

    if "<TOC>" in filecontents:
        print("Adding toc...", end="")
        filecontents = re.sub(
            "<TOC>", toctext, filecontents, flags=re.M | re.I)
    elif "<toc>" in filecontents:  # Duplicated code, dealing with lower letters <toc>
        print("Adding toc...", end="")
        filecontents = re.sub(
            "<toc>", toctext, filecontents, flags=re.M | re.I)

    elif "<!-- TOC -->" in filecontents:
        print("Updating toc...", end="")
        filecontents = re.sub(string_to_replace_pattern,
                              toctext, filecontents, flags=re.M | re.I)
    else:
        print("Unable to find <TOC> tag or existing toc, no changes were made.")
        return

    file_update = open(filename, "w")
    file_update.write(filecontents)
    file_update.close()
    print("done")


if __name__ == "__main__":
    if len(sys.argv) == 2:
        filename = sys.argv[1]
        try:
            generateTOC(filename)
        except FileNotFoundError as e:
            print(e)
    else:
        print("USAGE:", "$ python3 toc-gen.py filename.md",
              "\nEnsure <TOC> is in the markdown file.")
