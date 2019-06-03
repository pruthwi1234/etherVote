'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _Layout = require('../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _factory = require('../ethereum/factory');

var _factory2 = _interopRequireDefault(_factory);

var _web = require('../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

var _routes = require('../routes');

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'C:\\Users\\user\\Desktop\\EtherVote\\pages\\index.js?entry';


var divStyle = {
    width: '600px'
};

var imgStyle = {
    height: '400px'
};

var CampaignNew = function (_Component) {
    (0, _inherits3.default)(CampaignNew, _Component);

    function CampaignNew() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, CampaignNew);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CampaignNew.__proto__ || (0, _getPrototypeOf2.default)(CampaignNew)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            errorMessage: '',
            loading: false
        }, _this.onSubmit = function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event) {
                var account, add, campaigns, address;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                event.preventDefault();

                                _context.next = 3;
                                return _web2.default.eth.getAccounts();

                            case 3:
                                account = _context.sent;

                                console.log(account[0]);

                                _this.setState({ loading: true, errorMessage: '' });

                                _context.prev = 6;
                                _context.next = 9;
                                return _factory2.default.methods.createCampaign().send({
                                    from: account[0]
                                });

                            case 9:
                                add = _context.sent;
                                _context.next = 12;
                                return _factory2.default.methods.getDeployedCampaigns().call();

                            case 12:
                                campaigns = _context.sent;
                                address = campaigns[campaigns.length - 1];

                                _routes.Router.pushRoute('/campaigns/' + address + '/dashboard');

                                _context.next = 21;
                                break;

                            case 17:
                                _context.prev = 17;
                                _context.t0 = _context['catch'](6);

                                _this.setState({ errorMessage: _context.t0.message });
                                _this.setState({ loading: false });

                            case 21:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this2, [[6, 17]]);
            }));

            return function (_x) {
                return _ref2.apply(this, arguments);
            };
        }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(CampaignNew, [{
        key: 'render',
        value: function render() {

            return _react2.default.createElement(_Layout2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 55
                }
            }, _react2.default.createElement(_reactBootstrap.Container, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 56
                }
            }, _react2.default.createElement(_reactBootstrap.Row, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 57
                }
            }, _react2.default.createElement(_reactBootstrap.Col, { xs: 6, md: 6, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 58
                }
            }, _react2.default.createElement('div', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 59
                }
            }, _react2.default.createElement('h3', { textalign: 'center', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 60
                }
            }, 'Create a Campaign.'), _react2.default.createElement(_semanticUiReact.Form, { onSubmit: this.onSubmit, error: !!this.state.errorMessage, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 62
                }
            }, _react2.default.createElement(_semanticUiReact.Form.Group, { widths: 2, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 64
                }
            }, _react2.default.createElement(_semanticUiReact.Form.Input, {
                label: 'Election Title',
                placeholder: 'Election Title', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 65
                }
            })), _react2.default.createElement(_semanticUiReact.Form.Group, { widths: 2, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 69
                }
            }, _react2.default.createElement(_semanticUiReact.Form.Input, {
                label: 'Constituency Name',
                placeholder: 'Constituency Name', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 70
                }
            })), _react2.default.createElement(_semanticUiReact.Message, { error: true, header: 'Something Went Wrong.', content: this.state.errorMessage, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 74
                }
            }), _react2.default.createElement(_semanticUiReact.Button, { style: { marginTop: '10px' }, primary: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 76
                }
            }, ' Deploy to Blockchain. ')), _react2.default.createElement(_semanticUiReact.Dimmer, { active: this.state.loading, inverted: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 79
                }
            }, _react2.default.createElement(_semanticUiReact.Loader, { size: 'large', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 80
                }
            }, 'Deploying the election on Blockchain.')))), _react2.default.createElement(_reactBootstrap.Col, { xs: 12, md: 6, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 84
                }
            }, _react2.default.createElement('div', { style: divStyle, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 85
                }
            }, _react2.default.createElement(_reactBootstrap.Carousel, { interval: 3000, fade: true, controls: false, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 86
                }
            }, _react2.default.createElement(_reactBootstrap.Carousel.Item, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 87
                }
            }, _react2.default.createElement('img', { style: imgStyle,
                className: 'd-block w-100',
                src: 'https://dc-cdn.s3-ap-southeast-1.amazonaws.com/dc-Cover-pv50o4heptmeim10441npt7q54-20160901065939.Medi.jpeg',
                alt: 'First slide',
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 88
                }
            })), _react2.default.createElement(_reactBootstrap.Carousel.Item, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 95
                }
            }, _react2.default.createElement('img', { style: imgStyle,
                className: 'd-block w-100',
                src: 'https://c.ndtvimg.com/2019-03/5f7s9hg8_vote-generic_625x300_12_March_19.jpg',
                alt: 'second slide',
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 96
                }
            })), _react2.default.createElement(_reactBootstrap.Carousel.Item, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 103
                }
            }, _react2.default.createElement('img', { style: imgStyle,
                className: 'd-block w-100',
                src: 'https://www.abc.net.au/news/image/5414640-3x2-700x467.jpg',
                alt: 'Third slide',
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 104
                }
            }))))))));
        }
    }]);

    return CampaignNew;
}(_react.Component);

exports.default = CampaignNew;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFxpbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIkZvcm0iLCJCdXR0b24iLCJJbnB1dCIsIk1lc3NhZ2UiLCJEaW1tZXIiLCJMb2FkZXIiLCJMYXlvdXQiLCJmYWN0b3J5Iiwid2ViMyIsIlJvdXRlciIsIkNhcm91c2VsIiwiQ29udGFpbmVyIiwiUm93IiwiQ29sIiwiZGl2U3R5bGUiLCJ3aWR0aCIsImltZ1N0eWxlIiwiaGVpZ2h0IiwiQ2FtcGFpZ25OZXciLCJzdGF0ZSIsImVycm9yTWVzc2FnZSIsImxvYWRpbmciLCJvblN1Ym1pdCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJldGgiLCJnZXRBY2NvdW50cyIsImFjY291bnQiLCJjb25zb2xlIiwibG9nIiwic2V0U3RhdGUiLCJtZXRob2RzIiwiY3JlYXRlQ2FtcGFpZ24iLCJzZW5kIiwiZnJvbSIsImFkZCIsImdldERlcGxveWVkQ2FtcGFpZ25zIiwiY2FsbCIsImNhbXBhaWducyIsImFkZHJlc3MiLCJsZW5ndGgiLCJwdXNoUm91dGUiLCJtZXNzYWdlIiwibWFyZ2luVG9wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBQ2hCLEFBQVMsQUFBTSxBQUFRLEFBQU8sQUFBUyxBQUFROztBQUMvQyxBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTyxBQUFhOzs7O0FBQ3BCLEFBQU8sQUFBVTs7OztBQUNqQixBQUFTLEFBQWM7O0FBQ3ZCLEFBQVMsQUFBVSxBQUFXLEFBQUs7Ozs7Ozs7QUFFbkMsSUFBTTtXQUFOLEFBQWlCO0FBQUEsQUFDYjs7QUFHSixJQUFNO1lBQU4sQUFBaUI7QUFBQSxBQUNiOztJLEFBR0U7Ozs7Ozs7Ozs7Ozs7OzswTixBQUVGOzBCQUFRLEFBQ1UsQUFDZDtxQixBQUZJLEFBRUs7QUFGTCxBQUNKLGlCLEFBSUo7aUdBQVcsaUJBQUEsQUFBTyxPQUFQOzZDQUFBOzhFQUFBOzhCQUFBO3lEQUFBO2lDQUNQO3NDQURPLEFBQ1AsQUFBTTs7Z0RBREM7dUNBR2UsY0FBQSxBQUFLLElBSHBCLEFBR2UsQUFBUzs7aUNBQXpCO0FBSEMsbURBSVA7O3dDQUFBLEFBQVEsSUFBSSxRQUFaLEFBQVksQUFBUSxBQUVwQjs7c0NBQUEsQUFBSyxTQUFTLEVBQUUsU0FBRixBQUFXLE1BQU0sY0FOeEIsQUFNUCxBQUFjLEFBQStCOztnREFOdEM7Z0RBQUE7eURBVWUsQUFBUSxRQUFSLEFBQ2IsaUJBRGEsQUFFYjswQ0FDUyxRQWJYLEFBVWUsQUFFUixBQUNJLEFBQVE7QUFEWixBQUNGLGlDQUhVOztpQ0FBWjtBQVZILCtDQUFBO2dEQUFBO3VDQWdCcUIsa0JBQUEsQUFBUSxRQUFSLEFBQWdCLHVCQWhCckMsQUFnQnFCLEFBQXVDOztpQ0FBekQ7QUFoQkgscURBa0JHO0FBbEJILDBDQWtCYSxVQUFVLFVBQUEsQUFBVSxTQWxCakMsQUFrQmEsQUFBNkIsQUFFN0M7OytDQUFBLEFBQU8sMEJBQVAsQUFBK0IsVUFwQjVCOztnREFBQTtBQUFBOztpQ0FBQTtnREFBQTtnRUF1Qkg7O3NDQUFBLEFBQUssU0FBUyxFQUFFLGNBQWMsWUFBOUIsQUFBYyxBQUFvQixBQUNsQztzQ0FBQSxBQUFLLFNBQVMsRUFBRSxTQXhCYixBQXdCSCxBQUFjLEFBQVc7O2lDQXhCdEI7aUNBQUE7Z0RBQUE7O0FBQUE7eUNBQUE7QTs7Ozs7Ozs7OztpQ0E0QkYsQUFFTDs7bUNBQ0ksQUFBQzs7OEJBQUQ7Z0NBQUEsQUFDSTtBQURKO0FBQUEsYUFBQSxrQkFDSSxBQUFDOzs4QkFBRDtnQ0FBQSxBQUNJO0FBREo7QUFBQSwrQkFDSSxBQUFDOzs4QkFBRDtnQ0FBQSxBQUNJO0FBREo7QUFBQSwrQkFDSSxBQUFDLHFDQUFJLElBQUwsQUFBUyxHQUFHLElBQVosQUFBZ0I7OEJBQWhCO2dDQUFBLEFBQ0k7QUFESjsrQkFDSSxjQUFBOzs4QkFBQTtnQ0FBQSxBQUNJO0FBREo7QUFBQSwrQkFDSSxjQUFBLFFBQUksV0FBSixBQUFjOzhCQUFkO2dDQUFBO0FBQUE7ZUFESixBQUNJLEFBRUEsdUNBQUEsQUFBQyx1Q0FBSyxVQUFVLEtBQWhCLEFBQXFCLFVBQVUsT0FBTyxDQUFDLENBQUMsS0FBQSxBQUFLLE1BQTdDLEFBQW1EOzhCQUFuRDtnQ0FBQSxBQUVJO0FBRko7K0JBRUssY0FBRCxzQkFBQSxBQUFNLFNBQU0sUUFBWixBQUFvQjs4QkFBcEI7Z0NBQUEsQUFDSTtBQURKOzZDQUNJLEFBQUMsc0JBQUQsQUFBTTt1QkFBTixBQUNVLEFBQ047NkJBRkosQUFFZ0I7OEJBRmhCO2dDQUhSLEFBRUksQUFDSSxBQUlKO0FBSkk7QUFDSSxpQ0FHUCxjQUFELHNCQUFBLEFBQU0sU0FBTSxRQUFaLEFBQW9COzhCQUFwQjtnQ0FBQSxBQUNJO0FBREo7NkNBQ0ksQUFBQyxzQkFBRCxBQUFNO3VCQUFOLEFBQ1UsQUFDTjs2QkFGSixBQUVnQjs4QkFGaEI7Z0NBUlIsQUFPSSxBQUNJLEFBSUo7QUFKSTtBQUNJLGlDQUdSLEFBQUMsMENBQVEsT0FBVCxNQUFlLFFBQWYsQUFBc0IseUJBQXdCLFNBQVMsS0FBQSxBQUFLLE1BQTVELEFBQWtFOzhCQUFsRTtnQ0FaSixBQVlJLEFBRUE7QUFGQTtnQ0FFQSxBQUFDLHlDQUFPLE9BQU8sRUFBRSxXQUFqQixBQUFlLEFBQWEsVUFBVSxTQUF0Qzs4QkFBQTtnQ0FBQTtBQUFBO2VBakJSLEFBR0ksQUFjSSxBQUdKLDZDQUFBLEFBQUMseUNBQU8sUUFBUSxLQUFBLEFBQUssTUFBckIsQUFBMkIsU0FBUyxVQUFwQzs4QkFBQTtnQ0FBQSxBQUNJO0FBREo7K0JBQ0ksQUFBQyx5Q0FBTyxNQUFSLEFBQWE7OEJBQWI7Z0NBQUE7QUFBQTtlQXZCaEIsQUFDSSxBQUNJLEFBb0JJLEFBQ0ksQUFJWiw2REFBQSxBQUFDLHFDQUFJLElBQUwsQUFBUyxJQUFJLElBQWIsQUFBaUI7OEJBQWpCO2dDQUFBLEFBQ0k7QUFESjsrQkFDSSxjQUFBLFNBQUssT0FBTCxBQUFZOzhCQUFaO2dDQUFBLEFBQ0k7QUFESjsrQkFDSSxBQUFDLDBDQUFTLFVBQVYsQUFBb0IsTUFBTSxNQUExQixBQUFnQyxNQUFNLFVBQXRDLEFBQWdEOzhCQUFoRDtnQ0FBQSxBQUNJO0FBREo7K0JBQ0ssY0FBRCx5QkFBQSxBQUFVOzs4QkFBVjtnQ0FBQSxBQUNJO0FBREo7QUFBQSxzREFDUyxPQUFMLEFBQVksQUFDUjsyQkFESixBQUNjLEFBQ1Y7cUJBRkosQUFFUSxBQUNKO3FCQUhKLEFBR1E7OzhCQUhSO2dDQUZSLEFBQ0ksQUFDSSxBQU9KO0FBUEk7aUNBT0gsY0FBRCx5QkFBQSxBQUFVOzs4QkFBVjtnQ0FBQSxBQUNJO0FBREo7QUFBQSxzREFDUyxPQUFMLEFBQVksQUFDUjsyQkFESixBQUNjLEFBQ1Y7cUJBRkosQUFFUSxBQUNKO3FCQUhKLEFBR1E7OzhCQUhSO2dDQVZSLEFBU0ksQUFDSSxBQU9KO0FBUEk7aUNBT0gsY0FBRCx5QkFBQSxBQUFVOzs4QkFBVjtnQ0FBQSxBQUNJO0FBREo7QUFBQSxzREFDUyxPQUFMLEFBQVksQUFDUjsyQkFESixBQUNjLEFBQ1Y7cUJBRkosQUFFUSxBQUNKO3FCQUhKLEFBR1E7OzhCQUhSO2dDQWxEaEMsQUFDSSxBQUNJLEFBQ0ksQUEyQkksQUFDSSxBQUNJLEFBaUJJLEFBQ0ksQUFhbkM7QUFibUM7Ozs7OztBLEFBdkZkLEFBdUcxQjs7a0JBQUEsQUFBZSIsImZpbGUiOiJpbmRleC5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy91c2VyL0Rlc2t0b3AvRXRoZXJWb3RlIn0=