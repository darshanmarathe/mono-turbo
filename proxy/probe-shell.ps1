$ErrorActionPreference = 'Stop'
$html = (Invoke-WebRequest -UseBasicParsing 'http://localhost:5176/' -TimeoutSec 6).Content
Write-Output "=== index.html scripts ==="
$srcs = [regex]::Matches($html, 'src="([^"]+)"') | ForEach-Object { $_.Groups[1].Value }
$srcs | Sort-Object -Unique | ForEach-Object { Write-Output $_ }
$all = $html
foreach ($s in $srcs) {
  $u = if ($s -clike 'http*') { $s } else { "http://localhost:5176$s" }
  try { $c = (Invoke-WebRequest -UseBasicParsing $u -TimeoutSec 10).Content; $all += "`n" + $c } catch { Write-Output ("fetch failed " + $u) }
}
Write-Output "=== scan results ==="
Write-Output ("OLD config assets/remoteEntry.js present: " + ($all -match 'assets/remoteEntry.js'))
Write-Output ("NEW config /remoteEntry.js present: " + ($all -match 'localhost:517\d/remoteEntry.js'))
Write-Output ("any remoteEntry.js present: " + ($all -match 'remoteEntry.js'))
Write-Output ("remotes host name 'appAdmin' present: " + ($all -match 'appAdmin'))
Write-Output ("references kitchenSink: " + ($all -match 'kitchenSink'))
