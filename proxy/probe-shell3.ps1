$ErrorActionPreference = 'Stop'
$c = (Invoke-WebRequest -UseBasicParsing 'http://localhost:5176/assets/index.js' -TimeoutSec 10).Content
Write-Output "index.js length: $($c.Length)"
Write-Output ("contains 'remoteEntry': " + ($c -match 'remoteEntry'))
Write-Output ("contains '5174': " + ($c -match '5174'))
Write-Output ("contains '5173': " + ($c -match '5173'))
Write-Output ("contains 'assets/remoteEntry': " + ($c -match 'assets/remoteEntry'))
Write-Output "--- matches context ---"
$m = [regex]::Matches($c, 'remoteEntry\.js|mfe_internal|mf_owner|localhost:517\d|__mfe_internal.*remotes')
foreach ($x in $m) { $i = $x.Index; $s = [Math]::Max(0,$i-40); Write-Output ("...$($c.Substring($s, [Math]::Min($c.Length-$s,120)))...") }
