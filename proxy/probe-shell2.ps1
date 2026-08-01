$ErrorActionPreference = 'Stop'
$entryProxy = '/@id/__x00__virtual:mf-html-entry-proxy?init=%2F%40id%2Fvirtual%3Amf%3A__mfe_internal__shell__mf_owner__1__H_A_I__hostAutoInit__H_A_I__.js&entry=%2Fsrc%2Fmain.tsx'
$c = (Invoke-WebRequest -UseBasicParsing ("http://localhost:5176" + $entryProxy) -TimeoutSec 10).Content
Write-Output "len=$($c.Length)"
Write-Output ("OLD assets/remoteEntry.js: " + ($c -match 'assets/remoteEntry.js'))
Write-Output ("NEW /remoteEntry.js: " + ($c -match 'localhost:517\d/remoteEntry.js'))
Write-Output ("any remoteEntry.js: " + ($c -match 'remoteEntry.js'))
Write-Output ("refs localhost:5174: " + ($c -match 'localhost:5174'))
Write-Output ("refs localhost:5173: " + ($c -match 'localhost:5173'))
Write-Output "---- snippet ----"
Write-Output $c.Substring(0, [Math]::Min($c.Length, 600))
