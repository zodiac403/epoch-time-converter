# epoch-time-converter

Plugin for Mozilla Firefox. Easily convert time stamps form epoch to ISO 8601 format. Supports input in seconds, milliseconds and nanoseconds.

![Preview](doc/preview.png)

## Test Data

```txt
Test Case                   Input
----------------------      ----------------------
Input in seconds            1514769825
Input in milliseconds       1514769825789
Input in nanoseconds        1514769825789000000
Input in RFC3339 format     2018-01-01T01:23:45.789Z
Input in string format      01 Jan 2018 01:23:45 GMT
```

## Deploy on Mozilla

Create ZIP archive from local repository.

```sh
npm run zip
```

Upload archive to [https://addons.mozilla.org/](https://addons.mozilla.org/).
