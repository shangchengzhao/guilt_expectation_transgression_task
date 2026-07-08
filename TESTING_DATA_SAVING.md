# Testing Data Saving - Guilt Task

## Prerequisites

- PHP 7.0+
- Apache or another HTTP server with PHP enabled
- Writable `data/` directory

## Local test

```bash
cd guilt_expectation_transgression_task
php -S localhost:8000
```

1. Open `http://localhost:8000/test_server_config.php`
2. Open `http://localhost:8000/test_save_data.html` and click **Test Save Data**
3. Confirm a CSV appears in `data/`
4. Open `http://localhost:8000/index.html?ResponseID=TEST&PROLIFIC_PID=TEST123`

## Deploy to yeslab-survey

```bash
ssh username@yeslab-survey.psych.ucsb.edu
cd /home/www/apps/yeslab-survey.psych.ucsb.edu/public_html/guilt_expectation_transgression_task
```

Upload:

- `index.html`, `interaction_task.js`, `save_data.php`
- `lib/` (psychojs-2021.2.3.*)
- `condition.csv`, `prac_condition.csv`, all image stimuli
- `data/.htaccess`, `test_server_config.php`, `test_save_data.html`

```bash
chmod 777 data/
chmod 644 *.html *.php *.js
```

## Qualtrics entry URL

```
https://yeslab-survey.psych.ucsb.edu/guilt_expectation_transgression_task/index.html?ResponseID=${e://Field/ResponseID}&PROLIFIC_PID=${e://Field/PROLIFIC_PID}
```

## Post-task redirect

On completion, participants are sent to:

```
https://yeslab-survey.psych.ucsb.edu/guilt_expectation_trait_task/index.html?ResponseID=...&PROLIFIC_PID=...
```

## Saved filename format

```
{PROLIFIC_PID}_interaction_task_{date}.csv
```

`ResponseID` is stored in the `ResponseID` column and `expInfo` fields inside the CSV.

## Troubleshooting

- **404 on save_data.php**: upload PHP files to the same directory as `index.html`
- **Data directory not writable**: `chmod 755 data/` or `chmod 777 data/`
- **Experiment won't load**: confirm `lib/` exists and `index.html` points to `interaction_task.js`
- **Must use HTTP**: do not open via `file://`

Check `data/error.log` for PHP errors.
