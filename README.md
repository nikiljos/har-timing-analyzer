# Request Timimg Analyzer

A simple tool that can be used to compare time taken by the same endpoitns in multiple servers.

## Motivation
I had the same API running in 2 different servers and needed to compare the time taken for the same request in both the servers. 

Hence, built this tool.

## How to use
- Export batch HAR files from the `network` section in chrome devTools for all the sites that you want to comapre.
- Change file extension to `.json` and update the import paths.
- Update the`harMeta` array to specify the domain which you want to check. Please make sure that you keep the same index ans the `harCollection` array.

## Sample Output
[har-2023-05-09T17-20-17-075Z.csv](https://github.com/nikiljos/har-timing-analyzer/files/11434390/har-2023-05-09T17-20-17-075Z.csv)
