function(properties, context) {

  const bodyContent = properties.bodyContent;
  const rootDomain = properties.rootDomain;

  const htmlString = `
  ${bodyContent}
  `;

  // array for store href values
  const hrefValues = [];

  // find hrefs in a and link tags with regex
  const regex = /<(a|link)[^>]*href="([^"]*)"/g;
  let match;
  while ((match = regex.exec(htmlString)) !== null) {

    let valueToBePushed = match[2]; // match[2] now contains the href value

    // if the value doesn't contain rootDomain, then add it front
    if (!valueToBePushed.includes(rootDomain)) {
      if(valueToBePushed.includes('.')){
        continue;
      }

      valueToBePushed = rootDomain + valueToBePushed;
      valueToBePushed = valueToBePushed.replaceAll('//', '/');
    }

    // remove suffix
    valueToBePushed = valueToBePushed.replace('//', '').replace('https:', '').replace('http:');

    // if the value doesn't contain ".", then push it
    if (!valueToBePushed.split(rootDomain)[1].includes('.') && !valueToBePushed.includes('mailto')) {
      hrefValues.push(valueToBePushed);
    }

  }

  // get unique elements of hrefValues array
  const uniqueHrefValues = [...new Set(hrefValues)];

  // return unique href values
  return {
    returnedList: uniqueHrefValues
  }
}