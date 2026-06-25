# Dark Mode Fix Script
# This script adds dark mode classes to all text elements

$files = @(
    "d:\sc project\frontend\src\pages\Profile.jsx",
    "d:\sc project\frontend\src\pages\Scholarships.jsx",
    "d:\sc project\frontend\src\pages\Recommendations.jsx",
    "d:\sc project\frontend\src\components\ProfileSuccess.jsx"
)

foreach ($file in $files) {
    Write-Host "Processing: $file"
    
    $content = Get-Content $file -Raw
    
    # Add dark mode to common text patterns
    $content = $content -replace 'className="text-gray-600"', 'className="text-gray-600 dark:text-gray-300"'
    $content = $content -replace 'className="text-gray-700"', 'className="text-gray-700 dark:text-gray-200"'
    $content = $content -replace 'className="text-gray-500"', 'className="text-gray-500 dark:text-gray-400"'
    $content = $content -replace 'className="text-gray-800"', 'className="text-gray-800 dark:text-gray-200"'
    $content = $content -replace 'className="text-gray-900"', 'className="text-gray-900 dark:text-gray-100"'
    
    # Add dark mode to headings
    $content = $content -replace '(className="[^"]*font-bold[^"]*)"(?! dark:)', '$1 dark:text-gray-100"'
    
    # Add dark mode to primary/secondary colors
    $content = $content -replace 'className="text-primary-600"', 'className="text-primary-600 dark:text-primary-400"'
    $content = $content -replace 'className="text-secondary-600"', 'className="text-secondary-600 dark:text-secondary-400"'
    
    # Add dark mode to borders
    $content = $content -replace 'border-gray-200"', 'border-gray-200 dark:border-gray-700"'
    $content = $content -replace 'border-gray-300"', 'border-gray-300 dark:border-gray-600"'
    
    # Save the file
    Set-Content -Path $file -Value $content -NoNewline
    
    Write-Host "Completed: $file`n"
}

Write-Host "All files processed successfully!"
