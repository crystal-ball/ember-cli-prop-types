/* eslint-env node */
module.exports = {
  useYarn: true,

  scenarios: [
    {
      name: 'ember-lts-2.4',
      bower: {
        dependencies: {
          'ember': 'components/ember#lts-2-4'
        },
        resolutions: {
          'ember': 'lts-2-4'
        }
      },
      npm: {
        devDependencies: {
          'ember-source': null
        }
      }
    },
    {
      name: 'ember-lts-2.8',
      bower: {
        dependencies: {
          'ember': 'components/ember#lts-2-8'
        },
        resolutions: {
          'ember': 'lts-2-8'
        }
      },
      npm: {
        devDependencies: {
          'ember-source': null
        }
      }
    },
    {
      name: 'ember-release',
      bower: {
        dependencies: {
          'ember': 'components/ember#release'
        },
        resolutions: {
          'ember': 'release'
        }
      },
      npm: {
        devDependencies: {
          'ember-source': null
        }
      }
    },
    {
      name: 'ember-beta',
      bower: {
        dependencies: {
          'ember': 'components/ember#beta'
        },
        resolutions: {
          'ember': 'beta'
        }
      },
      npm: {
        devDependencies: {
          'ember-source': null
        }
      }
    },
    {
      name: 'ember-canary',
      bower: {
        dependencies: {
          'ember': 'components/ember#canary'
        },
        resolutions: {
          'ember': 'canary'
        }
      },
      npm: {
        devDependencies: {
          'ember-source': null
        }
      }
    },
    {
      name: 'ember-lts-2.12',
      npm: {
        devDependencies: {
          'ember-cli': '2.12.3',
          'ember-data': '2.18.5',
          'ember-load-initializers': '1.1.0',
          'ember-source': '2.12.2',
          'ember-qunit': '3.5.3'
        }
      }
    },
    {
      name: 'ember-lts-2.16',
      npm: {
        devDependencies: {
          'ember-cli': '2.16.2',
          'ember-source': '2.16.4'
        }
      }
    },
    {
      name: 'ember-3.1',
      npm: {
        devDependencies: {
          'ember-cli': '3.1.4',
          'ember-source': '3.1.2'
        }
      }
    },
    {
      name: 'ember-3.7',
      npm: {
        devDependencies: {
          'ember-cli': '3.7.1',
          'ember-source': '3.7.2'
        }
      }
    },
    {
      name: 'ember-default',
      npm: {
        devDependencies: {}
      }
    }
  ]
};
