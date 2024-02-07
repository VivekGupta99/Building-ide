const newCodeRun = new CodeRun({
                        code: code,
                        input: input,
                        lang: lang,
                        output: data.output,
                    });

                    newCodeRun.save()
                        .then(() => console.log('Code run saved successfully'))
                        .catch(err => console.error('Error saving code run:', err));
