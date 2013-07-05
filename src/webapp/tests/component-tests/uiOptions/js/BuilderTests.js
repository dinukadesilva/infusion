/*
Copyright 2013 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

// Declare dependencies
/*global fluid, jqUnit, expect, start, jQuery*/

// JSLint options
/*jslint white: true, funcinvoke: true, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, browser: true, forin: true, maxerr: 100, indent: 4 */

(function ($) {

    "use strict";

    fluid.registerNamespace("fluid.tests");

    fluid.tests.schema = {
        "textFont": {
            "type": "fluid.uiOptions.textFont",
            "classes": {
                "default": "",
                "times": "fl-font-uio-times",
                "comic": "fl-font-uio-comic-sans",
                "arial": "fl-font-uio-arial",
                "verdana": "fl-font-uio-verdana"
            }
        },
        "contrast": {
            "type": "fluid.uiOptions.contrast",
            "classes": {
                "default": "fl-theme-uio-default",
                "bw": "fl-theme-uio-bw fl-theme-bw",
                "wb": "fl-theme-uio-wb fl-theme-wb",
                "by": "fl-theme-uio-by fl-theme-by",
                "yb": "fl-theme-uio-yb fl-theme-yb"
            }
        },
        "enactors": [{
            "type": "fluid.uiOptions.enactors.textFont",
            "classes": "@textFont.classes"
        }, {
            "type": "fluid.uiOptions.enactors.contrast",
            "classes": "@contrast.classes"
        }]
    };

    fluid.tests.expectedSchema = {
        "textFont": {
            "type": "fluid.uiOptions.textFont",
            "classes": {
                "default": "",
                "times": "fl-font-uio-times",
                "comic": "fl-font-uio-comic-sans",
                "arial": "fl-font-uio-arial",
                "verdana": "fl-font-uio-verdana"
            }
        },
        "contrast": {
            "type": "fluid.uiOptions.contrast",
            "classes": {
                "default": "fl-theme-uio-default",
                "bw": "fl-theme-uio-bw fl-theme-bw",
                "wb": "fl-theme-uio-wb fl-theme-wb",
                "by": "fl-theme-uio-by fl-theme-by",
                "yb": "fl-theme-uio-yb fl-theme-yb"
            }
        },
        "enactors": {
            "fluid.uiOptions.enactors.textFont": {
                "type": "fluid.uiOptions.enactors.textFont",
                "options": {
                    "classes": {
                        "default": "",
                        "times": "fl-font-uio-times",
                        "comic": "fl-font-uio-comic-sans",
                        "arial": "fl-font-uio-arial",
                        "verdana": "fl-font-uio-verdana"
                    },
                    "rules": {
                        "textFont": "value"
                    }
                }
            },
            "fluid.uiOptions.enactors.contrast": {
                "type": "fluid.uiOptions.enactors.contrast",
                "options": {
                    "classes": {
                        "default": "fl-theme-uio-default",
                        "bw": "fl-theme-uio-bw fl-theme-bw",
                        "wb": "fl-theme-uio-wb fl-theme-wb",
                        "by": "fl-theme-uio-by fl-theme-by",
                        "yb": "fl-theme-uio-yb fl-theme-yb"
                    },
                    "rules": {
                        "theme": "value"
                    }
                }
            }
        }
    };

    fluid.defaults("fluid.tests.builder", {
        gradeNames: ["fluid.test.testEnvironment", "autoInit"],
        components: {
            emptyBuilder: {
                type: "fluid.uiOptions.builder"
            },
            sampleBuilder: {
                type: "fluid.uiOptions.builder",
                options: {
                    auxiliarySchema: fluid.tests.schema
                }
            },
            builderTester: {
                type: "fluid.tests.builderTester"
            }
        }
    });

    fluid.defaults("fluid.tests.builderTester", {
        gradeNames: ["fluid.test.testCaseHolder", "autoInit"],
        modules: [{
            name: "Builder",
            tests: [{
                expect: 2,
                name: "Empty builder.",
                sequence: [{
                    func: "fluid.tests.testEmptyBuilder",
                    args: "{emptyBuilder}"
                }]
            }]
        }, {
            name: "Sample Builder",
            tests: [{
                expect: 2,
                name: "Sample builder.",
                sequence: [{
                    func: "fluid.tests.testSampleBuilder",
                    args: "{sampleBuilder}"
                }]
            }]
        }]
    });

    fluid.tests.testEmptyBuilder = function (builder) {
        jqUnit.assertDeepEq("Resolved aux schema should be empty", {},
            builder.options.auxSchema);
        jqUnit.assertDeepEq("Resolved primary schema should be empty", {},
            builder.options.schema.properties);
    };

    fluid.tests.testSampleBuilder = function (builder) {
        jqUnit.assertDeepEq("Resolved aux schema should be expanded correctly",
            fluid.tests.expectedSchema, builder.options.auxSchema);
        jqUnit.assertDeepEq("Resolved primary schema should be assembled correctly",
            $.extend(true, {}, fluid.defaults("fluid.uiOptions.schemas.textFont").schema,
                fluid.defaults("fluid.uiOptions.schemas.contrast").schema),
            builder.options.schema);
    };

    $(document).ready(function () {
        fluid.test.runTests([
            "fluid.tests.builder"
        ]);
    });

})(jQuery);
