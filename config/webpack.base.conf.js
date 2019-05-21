const path = require('path')

module.exports = {
  resolve: {
    alias: {
      'components': path.resolve(__dirname, '../src/components/'),
      'reducers': path.resolve(__dirname, '../src/reducers/'),
      'actions': path.resolve(__dirname, '../src/actions/'),
      'images': path.resolve(__dirname, '../src/assets/img'),
      'apiRequest': path.resolve(__dirname, '../src/request'),
      'tools': path.resolve(__dirname, '../src/utils/tools'),
      'apiConfig': path.resolve(__dirname, '../src/config/customer/'),
      'constants': path.resolve(__dirname, '../src/config/constants'),
    }
  }
}
