$ErrorActionPreference = 'Stop'
$virt = '/@id/virtual:mf:__mfe_internal__shell__mf_owner__1__H_A_I__hostAutoInit__H_A_I__'
$c = (Invoke-WebRequest -UseBasicParsing ("http://localhost:5176" + $virt) -TimeoutSec 10).Content
Write-Output "length: $($c.Length)"
Write-Output ("contains 'remoteEntry': " + ($c -match 'remoteEntry'))
Write-Output ("contains '5174': " + ($c -match '5174'))
Write-Output ("contains '5173': " + ($c -match '5173'))
Write-Output ("contains 'assets/remoteEntry': " + ($c -match 'assets/remoteEntry'))
$m = [regex]::Matches($c, 'https?://[^\"; \r\n]+|remoteEntry\.js|__mfe_internal')
foreach ($x in $m) { $i=$x.Index; $s=[Math]::Max(0,$i-50); $len=[Math]::Min($c.Length-$s,160); Write-Output ("...$($c.Substring($s,$len))...") }
