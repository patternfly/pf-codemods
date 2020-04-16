# pf-3-to-4

CLI utility to help ease products transitioning to our new major @patternfly/react-core 4.0.0 release.

## Goals
- We want to minimize code changes and respect existing code
- We only want to make safe modifications
  - Don't touch code that we aren't sure is PatternFly

## redallen rationale
- Most consumers are using JSX
  - When they're using React.createElement or React.cloneElement that introduces unsafe complications

## Design
- Use a JSX parser that leaves formatting alone as much as possible
- Add basic ESM import parsing to make sure we're only modifying PatternFly `<Button>`s
