/*
Copyright 2013 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

// Declare dependencies
/*global fluid_1_5:true, jQuery*/

// JSLint options
/*jslint white: true, funcinvoke: true, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, browser: true, forin: true, maxerr: 100, indent: 4 */

var fluid_1_5 = fluid_1_5 || {};

(function ($, fluid) {

    /*******************************************************************************
     * Starter Root Model
     *
     * Provides the default values for the starter enhancer/panels models
     *******************************************************************************/

    fluid.defaults("fluid.prefs.rootModel.starter", {
        gradeNames: ["fluid.prefs.rootModel", "autoInit"],
        members: {
            // TODO: This information is supposed to be generated from the JSON
            // schema describing various preferences. For now it's kept in top
            // level uiOptions to avoid further duplication.
            rootModel: {
                textFont: "default",          // key from classname map
                theme: "default",             // key from classname map
                textSize: 1,                  // in points
                lineSpace: 1,                 // in ems
                toc: false,                  // boolean
                links: false,                // boolean
                inputsLarger: false          // boolean
            }
        }
    });

    /*******************************************************************************
     * CSSClassEnhancerBase
     *
     * Provides the map between the settings and css classes to be applied.
     * Used as a UIEnhancer base grade that can be pulled in as requestd.
     *******************************************************************************/

    fluid.defaults("fluid.uiEnhancer.cssClassEnhancerBase", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        classnameMap: {
            "textFont": {
                "default": "",
                "times": "fl-font-uio-times",
                "comic": "fl-font-uio-comic-sans",
                "arial": "fl-font-uio-arial",
                "verdana": "fl-font-uio-verdana"
            },
            "theme": {
                "default": "fl-theme-uio-default",
                "bw": "fl-theme-uio-bw fl-theme-bw",
                "wb": "fl-theme-uio-wb fl-theme-wb",
                "by": "fl-theme-uio-by fl-theme-by",
                "yb": "fl-theme-uio-yb fl-theme-yb",
                "lgdg": "fl-theme-uio-lgdg fl-theme-lgdg"
            },
            "links": "fl-link-enhanced",
            "inputsLarger": "fl-text-larger"
        }
    });

    /*******************************************************************************
     * BrowserTextEnhancerBase
     *
     * Provides the default font size translation between the strings and actual pixels.
     * Used as a UIEnhancer base grade that can be pulled in as requestd.
     *******************************************************************************/

    fluid.defaults("fluid.uiEnhancer.browserTextEnhancerBase", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        fontSizeMap: {
            "xx-small": "9px",
            "x-small":  "11px",
            "small":    "13px",
            "medium":   "15px",
            "large":    "18px",
            "x-large":  "23px",
            "xx-large": "30px"
        }
    });

    /*******************************************************************************
     * UI Enhancer Starter Enactors
     *
     * A grade component for UIEnhancer. It is a collection of default UI Enhancer
     * action ants.
     *******************************************************************************/

    fluid.defaults("fluid.uiEnhancer.starterEnactors", {
        gradeNames: ["fluid.uiEnhancer", "fluid.uiEnhancer.cssClassEnhancerBase", "fluid.uiEnhancer.browserTextEnhancerBase", "autoInit"],
        components: {
            textSize: {
                type: "fluid.prefs.enactors.textSize",
                container: "{uiEnhancer}.container",
                options: {
                    fontSizeMap: "{uiEnhancer}.options.fontSizeMap",
                    sourceApplier: "{uiEnhancer}.applier",
                    rules: {
                        "textSize": "value"
                    },
                    model: {
                        value: "{fluid.prefs.rootModel}.rootModel.textSize"
                    }
                }
            },
            textFont: {
                type: "fluid.prefs.enactors.textFont",
                container: "{uiEnhancer}.container",
                options: {
                    classes: "{uiEnhancer}.options.classnameMap.textFont",
                    sourceApplier: "{uiEnhancer}.applier",
                    rules: {
                        "textFont": "value"
                    },
                    model: {
                        value: "{fluid.prefs.rootModel}.rootModel.textFont"
                    }
                }
            },
            lineSpace: {
                type: "fluid.prefs.enactors.lineSpace",
                container: "{uiEnhancer}.container",
                options: {
                    fontSizeMap: "{uiEnhancer}.options.fontSizeMap",
                    sourceApplier: "{uiEnhancer}.applier",
                    rules: {
                        "lineSpace": "value"
                    },
                    model: {
                        value: "{fluid.prefs.rootModel}.rootModel.lineSpace"
                    }
                }
            },
            contrast: {
                type: "fluid.prefs.enactors.contrast",
                container: "{uiEnhancer}.container",
                options: {
                    classes: "{uiEnhancer}.options.classnameMap.theme",
                    sourceApplier: "{uiEnhancer}.applier",
                    rules: {
                        "theme": "value"
                    },
                    model: {
                        value: "{fluid.prefs.rootModel}.rootModel.theme"
                    }
                }
            },
            emphasizeLinks: {
                type: "fluid.prefs.enactors.emphasizeLinks",
                container: "{uiEnhancer}.container",
                options: {
                    cssClass: "{uiEnhancer}.options.classnameMap.links",
                    sourceApplier: "{uiEnhancer}.applier",
                    rules: {
                        "links": "value"
                    },
                    model: {
                        links: "{fluid.prefs.rootModel}.rootModel.links"
                    }
                }
            },
            inputsLarger: {
                type: "fluid.prefs.enactors.inputsLarger",
                container: "{uiEnhancer}.container",
                options: {
                    cssClass: "{uiEnhancer}.options.classnameMap.inputsLarger",
                    sourceApplier: "{uiEnhancer}.applier",
                    rules: {
                        "inputsLarger": "value"
                    },
                    model: {
                        inputsLarger: "{fluid.prefs.rootModel}.rootModel.inputsLarger"
                    }
                }
            },
            tableOfContents: {
                type: "fluid.prefs.enactors.tableOfContents",
                container: "{uiEnhancer}.container",
                // createOnEvent: "onCreateToc",
                options: {
                    tocTemplate: "{uiEnhancer}.options.tocTemplate",
                    sourceApplier: "{uiEnhancer}.applier",
                    rules: {
                        "toc": "value"
                    },
                    model: {
                        toc: "{fluid.prefs.rootModel}.rootModel.toc"
                    }
                }
            }
        }
    });

    /************************************************************************
     * The grade that contains shared options by all default settings panels
     ************************************************************************/

    fluid.defaults("fluid.prefs.defaultPanel", {
        gradeNames: ["fluid.eventedComponent", "autoInit"],
        mergePolicy: {
            sourceApplier: "nomerge"
        },
        sourceApplier: "{fluid.prefs}.applier",
        listeners: {
            "{uiOptions}.events.onUIOptionsRefresh": "{fluid.prefs.panels}.refreshView"
        },
        strings: {},
        parentBundle: "{prefsEditorLoader}.msgBundle"
    });

    /*********************************************************************************************************
     * Starter Settings Panels
     *
     * A collection of all the default UIO setting panels.
     *********************************************************************************************************/
    fluid.defaults("fluid.prefs.starterPanels", {
        gradeNames: ["fluid.prefs", "autoInit"],
        selectors: {
            textSize: ".flc-uiOptions-text-size",
            textFont: ".flc-uiOptions-text-font",
            lineSpace: ".flc-uiOptions-line-space",
            contrast: ".flc-uiOptions-contrast",
            textControls: ".flc-uiOptions-text-controls",
            layoutControls: ".flc-uiOptions-layout-controls",
            linksControls: ".flc-uiOptions-links-controls"
        },
        components: {
            textSize: {
                type: "fluid.prefs.panels.textSize",
                container: "{uiOptions}.dom.textSize",
                createOnEvent: "onUIOptionsMarkupReady",
                options: {
                    gradeNames: "fluid.prefs.defaultPanel",
                    rules: {
                        "textSize": "value"
                    },
                    model: {
                        value: "{fluid.prefs.rootModel}.rootModel.textSize"
                    },
                    resources: {
                        template: "{templateLoader}.resources.textSize"
                    }
                }
            },
            lineSpace: {
                type: "fluid.prefs.panels.lineSpace",
                container: "{uiOptions}.dom.lineSpace",
                createOnEvent: "onUIOptionsMarkupReady",
                options: {
                    gradeNames: "fluid.prefs.defaultPanel",
                    rules: {
                        "lineSpace": "value"
                    },
                    model: {
                        value: "{fluid.prefs.rootModel}.rootModel.lineSpace"
                    },
                    resources: {
                        template: "{templateLoader}.resources.lineSpace"
                    }
                }
            },
            textFont: {
                type: "fluid.prefs.panels.textFont",
                container: "{uiOptions}.dom.textFont",
                createOnEvent: "onUIOptionsMarkupReady",
                options: {
                    gradeNames: "fluid.prefs.defaultPanel",
                    classnameMap: "{uiEnhancer}.options.classnameMap",
                    rules: {
                        "textFont": "value"
                    },
                    model: {
                        value: "{fluid.prefs.rootModel}.rootModel.textFont"
                    },
                    resources: {
                        template: "{templateLoader}.resources.textFont"
                    }
                }
            },
            contrast: {
                type: "fluid.prefs.panels.contrast",
                container: "{uiOptions}.dom.contrast",
                createOnEvent: "onUIOptionsMarkupReady",
                options: {
                    gradeNames: "fluid.prefs.defaultPanel",
                    classnameMap: "{uiEnhancer}.options.classnameMap",
                    rules: {
                        "theme": "value"
                    },
                    model: {
                        value: "{fluid.prefs.rootModel}.rootModel.theme"
                    },
                    resources: {
                        template: "{templateLoader}.resources.contrast"
                    }
                }
            },
            layoutControls: {
                type: "fluid.prefs.panels.layoutControls",
                container: "{uiOptions}.dom.layoutControls",
                createOnEvent: "onUIOptionsMarkupReady",
                options: {
                    gradeNames: "fluid.prefs.defaultPanel",
                    rules: {
                        "toc": "toc"
                    },
                    model: {
                        toc: "{fluid.prefs.rootModel}.rootModel.toc"
                    },
                    resources: {
                        template: "{templateLoader}.resources.layoutControls"
                    }
                }
            },
            linksControls: {
                type: "fluid.prefs.panels.linksControls",
                container: "{uiOptions}.dom.linksControls",
                createOnEvent: "onUIOptionsMarkupReady",
                options: {
                    gradeNames: "fluid.prefs.defaultPanel",
                    rules: {
                        "links": "links",
                        "inputsLarger": "inputsLarger"
                    },
                    model: {
                        links: "{fluid.prefs.rootModel}.rootModel.links",
                        inputsLarger: "{fluid.prefs.rootModel}.rootModel.inputsLarger"
                    },
                    resources: {
                        template: "{templateLoader}.resources.linksControls"
                    }
                }
            }
        }
    });

    /******************************
     * Starter Template Loader
     ******************************/

    /**
     * A template loader component that expands the resources blocks for loading templates used by starterPanels
     *
     * @param {Object} options
     */

    fluid.defaults("fluid.prefs.starterTemplateLoader", {
        gradeNames: ["fluid.prefs.resourceLoader", "autoInit"],
        templates: {
            textSize: "%prefix/PrefsEditorTemplate-textSize.html",
            textFont: "%prefix/PrefsEditorTemplate-textFont.html",
            lineSpace: "%prefix/PrefsEditorTemplate-lineSpace.html",
            contrast: "%prefix/PrefsEditorTemplate-contrast.html",
            layoutControls: "%prefix/PrefsEditorTemplate-layout.html",
            linksControls: "%prefix/PrefsEditorTemplate-links.html"
        }
    });

    fluid.defaults("fluid.prefs.starterSeparatedPanelTemplateLoader", {
        gradeNames: ["fluid.prefs.starterTemplateLoader", "autoInit"],
        templates: {
            uiOptions: "%prefix/SeparatedPanelPrefsEditor.html"
        }
    });

    fluid.defaults("fluid.prefs.starterFullPreviewTemplateLoader", {
        gradeNames: ["fluid.prefs.starterTemplateLoader", "autoInit"],
        templates: {
            uiOptions: "%prefix/FullPreviewPrefsEditor.html"
        }
    });

    fluid.defaults("fluid.prefs.starterFullNoPreviewTemplateLoader", {
        gradeNames: ["fluid.prefs.starterTemplateLoader", "autoInit"],
        templates: {
            uiOptions: "%prefix/FullNoPreviewPrefsEditor.html"
        }
    });

    /******************************
     * Starter Message Loader
     ******************************/

    /**
     * A message loader component that expands the resources blocks for loading messages for starter panels
     *
     * @param {Object} options
     */

    fluid.defaults("fluid.prefs.starterMessageLoader", {
        gradeNames: ["fluid.prefs.resourceLoader", "autoInit"],
        templates: {
            uiOptions: "%prefix/prefsEditor.json",
            textSize: "%prefix/textSize.json",
            textFont: "%prefix/textFont.json",
            lineSpace: "%prefix/lineSpace.json",
            contrast: "%prefix/contrast.json",
            layoutControls: "%prefix/tableOfContents.json",
            linksControls: "%prefix/links.json"
        }
    });

})(jQuery, fluid_1_5);
