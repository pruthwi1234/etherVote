'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _campaign = require('../../ethereum/campaign');

var _campaign2 = _interopRequireDefault(_campaign);

var _web = require('../../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

var _routes = require('../../routes');

var _Layout = require('../../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'C:\\Users\\user\\Desktop\\EtherVote\\pages\\campaigns\\add.js?entry';


var RequestNew = function (_Component) {
    (0, _inherits3.default)(RequestNew, _Component);

    function RequestNew() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, RequestNew);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RequestNew.__proto__ || (0, _getPrototypeOf2.default)(RequestNew)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            name: '',
            imageLink: '',
            partyName: '',
            flag: false,
            loading: false,
            flag2: false
        }, _this.onFinalize = function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                event.preventDefault();

                                _this.setState({ flag2: true });

                                window.open('/campaigns/' + _this.props.address + '/vote', "_blank");

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this2);
            }));

            return function (_x) {
                return _ref2.apply(this, arguments);
            };
        }(), _this.onShowResult = function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(event) {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                event.preventDefault();
                                window.open('/campaigns/' + _this.props.address + '/results', "_blank");

                            case 2:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this2);
            }));

            return function (_x2) {
                return _ref3.apply(this, arguments);
            };
        }(), _this.onSubmit = function () {
            var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(event) {
                var campaign, _this$state, name, imageLink, partyName, accounts;

                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                event.preventDefault();

                                campaign = (0, _campaign2.default)(_this.props.address);
                                _this$state = _this.state, name = _this$state.name, imageLink = _this$state.imageLink, partyName = _this$state.partyName;

                                _this.setState({ loading: true });

                                _context3.prev = 4;
                                _context3.next = 7;
                                return _web2.default.eth.getAccounts();

                            case 7:
                                accounts = _context3.sent;
                                _context3.next = 10;
                                return campaign.methods.createRequest(name, partyName, imageLink).send({
                                    from: accounts[0]
                                });

                            case 10:

                                _this.setState({ name: '', imageLink: '', partyName: '' });

                                _routes.Router.pushRoute('/campaigns/' + _this.props.address + '/dashboard');
                                _context3.next = 17;
                                break;

                            case 14:
                                _context3.prev = 14;
                                _context3.t0 = _context3['catch'](4);

                                console.log(_context3.t0.message);

                            case 17:
                                _this.setState({ flag: true });
                                _this.setState({ loading: false });

                            case 19:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, _this2, [[4, 14]]);
            }));

            return function (_x3) {
                return _ref4.apply(this, arguments);
            };
        }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(RequestNew, [{
        key: 'renderRows',
        value: function renderRows() {

            var items = this.props.requests.map(function (request, index) {
                return {
                    image: request.imageLink,
                    header: request.partyName,
                    meta: request.name
                };
            });
            return _react2.default.createElement(_semanticUiReact.Card.Group, { itemsPerRow: 3, items: items, style: { marginRight: '30px' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 82
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(_Layout2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 87
                }
            }, _react2.default.createElement(_semanticUiReact.Grid, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 88
                }
            }, _react2.default.createElement(_semanticUiReact.Grid.Column, { width: 11, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 89
                }
            }, this.renderRows()), _react2.default.createElement(_semanticUiReact.Grid.Column, { width: 5, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 93
                }
            }, _react2.default.createElement('h3', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 94
                }
            }, 'Add a Candidate.'), _react2.default.createElement(_semanticUiReact.Form, { disabled: this.state.flag2, onSubmit: this.onSubmit, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 95
                }
            }, _react2.default.createElement(_semanticUiReact.Form.Field, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 96
                }
            }, _react2.default.createElement('label', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 97
                }
            }, 'Name of the Candidate.'), _react2.default.createElement(_semanticUiReact.Input, {
                value: this.state.name,
                onChange: function onChange(event) {
                    return _this3.setState({ name: event.target.value });
                },
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 98
                }
            })), _react2.default.createElement(_semanticUiReact.Form.Field, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 104
                }
            }, _react2.default.createElement('label', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 105
                }
            }, 'Party Name of the Candidate.'), _react2.default.createElement(_semanticUiReact.Input, {
                value: this.state.partyName,
                onChange: function onChange(event) {
                    return _this3.setState({ partyName: event.target.value });
                },
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 106
                }
            })), _react2.default.createElement(_semanticUiReact.Form.Field, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 112
                }
            }, _react2.default.createElement('label', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 113
                }
            }, 'Image URL of the party.'), _react2.default.createElement(_semanticUiReact.Input, {
                value: this.state.imageLink,
                onChange: function onChange(event) {
                    return _this3.setState({ imageLink: event.target.value });
                },
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 114
                }
            })), _react2.default.createElement(_semanticUiReact.Button, { primary: true, disabled: this.state.flag2, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 120
                }
            }, 'Add Candidate.')), _react2.default.createElement(_semanticUiReact.Form, { onSubmit: this.onFinalize, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 122
                }
            }, _react2.default.createElement(_semanticUiReact.Button, { inverted: true, color: 'blue', style: { marginTop: '25px' }, disabled: !this.state.flag, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 123
                }
            }, 'Start Election!')), _react2.default.createElement(_semanticUiReact.Form, { onSubmit: this.onShowResult, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 125
                }
            }, _react2.default.createElement(_semanticUiReact.Button, { inverted: true, color: 'blue', style: { marginTop: '25px' }, disabled: !this.state.flag, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 126
                }
            }, 'Show Result')))), _react2.default.createElement(_semanticUiReact.Dimmer, { active: this.state.loading, inverted: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 132
                }
            }, _react2.default.createElement(_semanticUiReact.Loader, { size: 'large', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 133
                }
            }, 'Adding the Candidate.')));
        }
    }], [{
        key: 'getInitialProps',
        value: function () {
            var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(props) {
                var address, campaign, requestCount, requests;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                address = props.query.address;
                                campaign = (0, _campaign2.default)(address);
                                _context4.next = 4;
                                return campaign.methods.getRequestsCount().call();

                            case 4:
                                requestCount = _context4.sent;
                                _context4.next = 7;
                                return _promise2.default.all(Array(parseInt(requestCount)).fill().map(function (element, index) {
                                    return campaign.methods.requests(index).call();
                                }));

                            case 7:
                                requests = _context4.sent;
                                return _context4.abrupt('return', { requests: requests, address: address });

                            case 9:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function getInitialProps(_x4) {
                return _ref5.apply(this, arguments);
            }

            return getInitialProps;
        }()
    }]);

    return RequestNew;
}(_react.Component);

exports.default = RequestNew;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFxjYW1wYWlnbnNcXGFkZC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIkZvcm0iLCJCdXR0b24iLCJNZXNzYWdlIiwiTGFiZWwiLCJJbnB1dCIsIkdyaWQiLCJJbWFnZSIsIkRpbW1lciIsIkxvYWRlciIsIkNhcmQiLCJDYW1wYWlnbiIsIndlYjMiLCJMaW5rIiwiUm91dGVyIiwiTGF5b3V0IiwiUmVxdWVzdE5ldyIsInN0YXRlIiwibmFtZSIsImltYWdlTGluayIsInBhcnR5TmFtZSIsImZsYWciLCJsb2FkaW5nIiwiZmxhZzIiLCJvbkZpbmFsaXplIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInNldFN0YXRlIiwid2luZG93Iiwib3BlbiIsInByb3BzIiwiYWRkcmVzcyIsIm9uU2hvd1Jlc3VsdCIsIm9uU3VibWl0IiwiY2FtcGFpZ24iLCJldGgiLCJnZXRBY2NvdW50cyIsImFjY291bnRzIiwibWV0aG9kcyIsImNyZWF0ZVJlcXVlc3QiLCJzZW5kIiwiZnJvbSIsInB1c2hSb3V0ZSIsImNvbnNvbGUiLCJsb2ciLCJtZXNzYWdlIiwiaXRlbXMiLCJyZXF1ZXN0cyIsIm1hcCIsInJlcXVlc3QiLCJpbmRleCIsImltYWdlIiwiaGVhZGVyIiwibWV0YSIsIm1hcmdpblJpZ2h0IiwicmVuZGVyUm93cyIsInRhcmdldCIsInZhbHVlIiwibWFyZ2luVG9wIiwicXVlcnkiLCJnZXRSZXF1ZXN0c0NvdW50IiwiY2FsbCIsInJlcXVlc3RDb3VudCIsImFsbCIsIkFycmF5IiwicGFyc2VJbnQiLCJmaWxsIiwiZWxlbWVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVM7Ozs7QUFDaEIsQUFBUyxBQUFNLEFBQVEsQUFBUyxBQUFPLEFBQU8sQUFBTSxBQUFNLEFBQVEsQUFBUTs7QUFDMUUsQUFBTyxBQUFjOzs7O0FBQ3JCLEFBQU8sQUFBVTs7OztBQUNqQixBQUFT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QUE7MkJBQVMsT0FBQSxBQUFLLFNBQVMsRUFBRSxXQUFXLE1BQUEsQUFBTSxPQUExQyxBQUFTLEFBQWMsQUFBMEI7QUFGL0Q7OzhCQUFBO2dDQW5CUixBQWlCSSxBQUVJLEFBTUo7QUFOSTtBQUNJLGlDQUtSLEFBQUMseUNBQU8sU0FBUixNQUFnQixVQUFVLEtBQUEsQUFBSyxNQUEvQixBQUFxQzs4QkFBckM7Z0NBQUE7QUFBQTtlQTNCUixBQUVJLEFBeUJJLEFBRUosb0NBQUEsQUFBQyx1Q0FBSyxVQUFVLEtBQWhCLEFBQXFCOzhCQUFyQjtnQ0FBQSxBQUNJO0FBREo7K0JBQ0ksQUFBQyx5Q0FBTyxVQUFSLE1BQWlCLE9BQWpCLEFBQXVCLFFBQU8sT0FBTyxFQUFFLFdBQXZDLEFBQXFDLEFBQWEsVUFBVSxVQUFVLENBQUMsS0FBQSxBQUFLLE1BQTVFLEFBQWtGOzhCQUFsRjtnQ0FBQTtBQUFBO2VBOUJSLEFBNkJJLEFBQ0ksQUFFSixxQ0FBQSxBQUFDLHVDQUFLLFVBQVUsS0FBaEIsQUFBcUI7OEJBQXJCO2dDQUFBLEFBQ0k7QUFESjsrQkFDSSxBQUFDLHlDQUFPLFVBQVIsTUFBaUIsT0FBakIsQUFBdUIsUUFBTyxPQUFPLEVBQUUsV0FBdkMsQUFBcUMsQUFBYSxVQUFVLFVBQVUsQ0FBQyxLQUFBLEFBQUssTUFBNUUsQUFBa0Y7OEJBQWxGO2dDQUFBO0FBQUE7ZUF2Q2hCLEFBQ0ksQUFLSSxBQWdDSSxBQUNJLEFBTVosbUNBQUEsQUFBQyx5Q0FBTyxRQUFRLEtBQUEsQUFBSyxNQUFyQixBQUEyQixTQUFTLFVBQXBDOzhCQUFBO2dDQUFBLEFBQ0k7QUFESjsrQkFDSSxBQUFDLHlDQUFPLE1BQVIsQUFBYTs4QkFBYjtnQ0FBQTtBQUFBO2VBL0NaLEFBQ0ksQUE2Q0ksQUFDSSxBQUlmOzs7OzttSCxBQS9INEI7Ozs7O2lDQUNqQjtBLDBDQUFZLE0sQUFBTSxNQUVwQixBLEFBRkU7QSwyQ0FFUyx3QixBQUFBLEFBQVM7O3VDQUNDLFNBQUEsQUFBUyxRQUFULEFBQWlCLG1CLEFBQWpCLEFBQW9DOztpQ0FBekQ7QTs7eURBRWlCLEFBQVEsVUFDckIsU0FBTixBQUFNLEFBQVMsZUFBZixBQUNLLE9BREwsQUFFSyxJQUFJLFVBQUEsQUFBQyxTQUFELEFBQVUsT0FBVSxBQUNyQjsyQ0FBTyxTQUFBLEFBQVMsUUFBVCxBQUFpQixTQUFqQixBQUEwQixPQUFqQyxBQUFPLEFBQWlDLEFBQzNDO0EsQUFMYyxBQUNuQixpQ0FBQSxDQURtQjs7aUNBQWpCO0E7a0VBUUMsRUFBRSxVQUFGLFVBQVksUyxBQUFaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0hmLEEsQUFwSXlCOztrQkFvSXpCLEFBQWUiLCJmaWxlIjoiYWRkLmpzP2VudHJ5Iiwic291cmNlUm9vdCI6IkM6L1VzZXJzL3VzZXIvRGVza3RvcC9FdGhlclZvdGUifQ==