### user-feedback-warn-changes [(#76)](https://github.com/patternfly/react-user-feedback/pull/76)

The internal scss stylesheet that `FeedbackModal` and its internal components were referencing has been refactored into a css stylesheet. The new `Feedback.css` file will have to be imported to maintain styling on `FeedbackModal`, and may be located in the dist (`@patternfly/react-user-feedback/dist/esm/Feedback/Feedback.css`) or in the `src`.
