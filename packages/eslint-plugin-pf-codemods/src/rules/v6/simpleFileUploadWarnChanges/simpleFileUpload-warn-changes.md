### simpleFileUpload-warn-changes [(#10026)](https://github.com/patternfly/patternfly-react/pull/10026)

The `aria-describedby` attribute was removed from the TextInput within the SimpleFileUpload, and the `id` attribute was removed from the "browse" button. Instead use the new `browseButtonAriaDescribedby` prop to provide a description to the browse button.

Additionally, we recommend using our FileUploadHelperText component as a child to the FileUpload, instead of using our FormHelperText (the previous recommendation).
