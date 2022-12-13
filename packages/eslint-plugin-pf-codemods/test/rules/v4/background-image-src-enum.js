const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v4/background-image-src-enum');

ruleTester.run("background-image-src-enum", rule, {
  valid: [
    {
      code: `import { BackgroundImage } from '@patternfly/react-core';
const images = {
  lg: '/assets/images/pfbg_1200.jpg',
  sm: '/assets/images/pfbg_768.jpg',
  sm2x: '/assets/images/pfbg_768@2x.jpg',
  xs: '/assets/images/pfbg_576.jpg',
  xs2x: '/assets/images/pfbg_576@2x.jpg'
};
<BackgroundImage src={images} />`,
    },
    {
      // Let member expressions slide for now. We never really supported this API.
      code: `import { BackgroundImageSrc } from '@patternfly/react-core'; const a = BackgroundImageSrc.xs;`
    }
  ],
  invalid: [
    {
      code:   `import { BackgroundImage, BackgroundImageSrc } from '@patternfly/react-core';
const images = {
  [BackgroundImageSrc.lg]: '/assets/images/pfbg_1200.jpg',
  [BackgroundImageSrc.sm]: '/assets/images/pfbg_768.jpg',
  [BackgroundImageSrc.sm2x]: '/assets/images/pfbg_768@2x.jpg',
  [BackgroundImageSrc.xs]: '/assets/images/pfbg_576.jpg',
  [BackgroundImageSrc.xs2x]: '/assets/images/pfbg_576@2x.jpg',
  [BackgroundImageSrc.filter]: '/assets/images/background-filter.svg' ,
};
<BackgroundImage src={images} />`,
      output: `import { BackgroundImage, BackgroundImageSrc } from '@patternfly/react-core';
const images = {
  lg: '/assets/images/pfbg_1200.jpg',
  sm: '/assets/images/pfbg_768.jpg',
  sm2x: '/assets/images/pfbg_768@2x.jpg',
  xs: '/assets/images/pfbg_576.jpg',
  xs2x: '/assets/images/pfbg_576@2x.jpg',
   
};
<BackgroundImage src={images} />`,
      errors: [
        {
          message: "BackgroundImageSrc.lg has been removed. Use the string 'lg' instead",
          type: "Property",
        },
        {
          message: "BackgroundImageSrc.sm has been removed. Use the string 'sm' instead",
          type: "Property",
        },
        {
          message: "BackgroundImageSrc.sm2x has been removed. Use the string 'sm2x' instead",
          type: "Property",
        },
        {
          message: "BackgroundImageSrc.xs has been removed. Use the string 'xs' instead",
          type: "Property",
        },
        {
          message: "BackgroundImageSrc.xs2x has been removed. Use the string 'xs2x' instead",
          type: "Property",
        },
        {
          message: "BackgroundImageSrc.filter has been removed. If you want a custom filter, use the new filter prop instead",
          type: "Property",
        }
      ]
    },
    {
      code:   `import { BackgroundImage, BackgroundImageSrc } from '@patternfly/react-core';
const images = {
  [BackgroundImageSrc.lg]: '/assets/images/pfbg_1200.jpg',
  [BackgroundImageSrc.sm]: '/assets/images/pfbg_768.jpg',
  [BackgroundImageSrc.sm2x]: '/assets/images/pfbg_768@2x.jpg',
  [BackgroundImageSrc.xs]: '/assets/images/pfbg_576.jpg',
  [BackgroundImageSrc.xs2x]: '/assets/images/pfbg_576@2x.jpg',
  [BackgroundImageSrc.filter]: '/assets/images/background-filter.svg'
};
<BackgroundImage src={images} />`,
      output: `import { BackgroundImage, BackgroundImageSrc } from '@patternfly/react-core';
const images = {
  lg: '/assets/images/pfbg_1200.jpg',
  sm: '/assets/images/pfbg_768.jpg',
  sm2x: '/assets/images/pfbg_768@2x.jpg',
  xs: '/assets/images/pfbg_576.jpg',
  xs2x: '/assets/images/pfbg_576@2x.jpg',
  
};
<BackgroundImage src={images} />`,
      errors: [
        {
          message: "BackgroundImageSrc.lg has been removed. Use the string 'lg' instead",
          type: "Property",
        },
        {
          message: "BackgroundImageSrc.sm has been removed. Use the string 'sm' instead",
          type: "Property",
        },
        {
          message: "BackgroundImageSrc.sm2x has been removed. Use the string 'sm2x' instead",
          type: "Property",
        },
        {
          message: "BackgroundImageSrc.xs has been removed. Use the string 'xs' instead",
          type: "Property",
        },
        {
          message: "BackgroundImageSrc.xs2x has been removed. Use the string 'xs2x' instead",
          type: "Property",
        },
        {
          message: "BackgroundImageSrc.filter has been removed. If you want a custom filter, use the new filter prop instead",
          type: "Property",
        }
      ]
    }
  ]
});
