

if [ -f "$1" ]; then
    echo "File $1 exists"
else
    echo "File $1 does not exist"
    exit 1
fi

# newlines
sed -i '' 's/\\n/\n/g' "$1"

# headers
sed -i '' 's/=//g' "$1"

# quotes
sed -i '' 's/\\"/"/g' "$1"

# unicodes
sed -i '' 's/\\u2013/-/g' "$1"
sed -i '' 's/\\u2014/-/g' "$1"
sed -i '' 's/\\u00a3/£/g' "$1"
sed -i '' 's/\\u2019/’/g' "$1"
sed -i '' 's/\\u2018/‘/g' "$1"
sed -i '' 's/\\u201c/“/g' "$1"
sed -i '' 's/\\u201d/”/g' "$1"
sed -i '' 's/\\u2026/.../g' "$1"
sed -i '' 's/\\u00a0/ /g' "$1"

# add space after period if followed by a letter
sed -i '' 's/\.\([a-zA-Z]\)/. \1/g' "$1"

# change "U. S." to "United States"
sed -i '' 's/U\. S\./United States/g' "$1"

# check if first character is " and remove it
if [ "$(head -c 1 "$1")" = '"' ]; then
    sed -i '' '1s/^"//' "$1"
fi

# remove everything after "See Also"
sed -i '' '/ See also /,$d' "$1"

# remove "(*born*)" and "(*died*)" from names
# input "Javier Gerardo Milei (/miˈleɪ/ mee-LAY, Spanish pronunciation: [xaˈβjeɾ xeˈɾaɾ.ðo miˈlej]; born 22 October 1970) is an Argentine politician, economist"
# output "Javier Gerardo Milei is an Argentine politician, economist"


# remove language translations ()

echo "done"