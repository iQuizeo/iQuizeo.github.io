<?php
require 'vendor/autoload.php'; // Include the PhpSpreadsheet library

use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $selectedCandidates = $_POST["selectedCandidates"];

    // Ensure there are no more than 8 selected candidates
    if (count($selectedCandidates) <= 8) {
        $excelFilePath = 'poll_results.xlsx';
        if (file_exists($excelFilePath)) {
            $spreadsheet = IOFactory::load($excelFilePath);
        } else {
            $spreadsheet = new Spreadsheet();
        }

        $worksheet = $spreadsheet->getActiveSheet();
        $row = $worksheet->getHighestRow() + 1;
        $col = 1;

        // Split the selected candidates string into an array
        $selectedCandidatesArray = explode(', ', $selectedCandidates);

        foreach ($selectedCandidatesArray as $candidate) {
            $worksheet->setCellValueByColumnAndRow($col, $row, $candidate);
            $col++;
        }

        $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer->save($excelFilePath);

        echo "Your vote has been recorded successfully.";
    } else {
        echo "You selected more than 8 candidates. Please select up to 8 candidates.";
    }
} else {
    echo "Form submission error.";
}
?>
