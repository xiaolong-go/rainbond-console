webpackJsonp([12],{17:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _pageController=__webpack_require__(2),_pageController2=_interopRequireDefault(_pageController),_appApiCenter=__webpack_require__(1),_pageAppApiCenter=__webpack_require__(3),_widget=__webpack_require__(0),_widget2=_interopRequireDefault(_widget),_validationUtil=__webpack_require__(10),_validationUtil2=_interopRequireDefault(_validationUtil),template=__webpack_require__(51),Msg=_widget2.default.Message,createRuleTmp=function(data){var html=[],index=1;for(var id in data){var tr="<tr data-id='"+id+"'>";tr+="<td>"+index+"</td>",tr+="<td>"+data[id].statuscn+"</td>",tr+="<td>"+data[id].count+"</td>",tr+="<td>"+data[id].desc+"</td>",tr+="<td class='text-right'><button class='btn btn-default btn-sm delRule'>删除</button>",data[id].status?tr+="<button style=' margin-left:15px;' class='btn btn-default btn-sm closeRule'>关闭</button>":tr+="<button style=' margin-left:15px;' class='btn btn-success btn-sm openRule'>开启</button>",tr+="<td>",tr+="</tr>",index++,html.push(tr)}return html.join("")},AppExpansion=(0,_pageController2.default)({template:template,property:{tenantName:"",serviceAlias:"",servicecName:"",language:"",code_from:"",serviceId:"",renderData:{pageData:null,appInfo:null,tenantName:"",serviceAlias:""}},method:{getInitData:function(){var _this=this;(0,_appApiCenter.getAppInfo)(this.tenantName,this.serviceAlias).done(function(appInfo){_this.renderData.appInfo=appInfo,(0,_pageAppApiCenter.getPageExpansionAppData)(_this.tenantName,_this.serviceAlias).done(function(pageData){_this.renderData.pageData=pageData,_this.render(),setTimeout(function(){_this.loadRuleData()})})})},loadRuleData:function(){(0,_appApiCenter.getAutoExtendRule)(this.tenantName,this.serviceAlias).done(function(data){$("#ruleBody").html(createRuleTmp(data))})},checkRuleData:function(data){var min=data.minvalue,max=data.maxvalue;return _validationUtil2.default.valid("zzs",min)&&_validationUtil2.default.valid("zzs",max)?!(parseInt(min)>parseInt(max))||(Msg.warning("大值不能小于小值，请检查后重试"),!1):(Msg.warning("大于和小于的值只能为正整数，请检查后重试"),!1)},handleAddAutoExtendRule:function(data){var _this2=this;this.checkRuleData(data)&&(0,_appApiCenter.addAutoExtendRule)(this.tenantName,this.serviceAlias,data).done(function(data){_this2.loadRuleData()})},handleDelRule:function(id){var _this3=this;(0,_appApiCenter.delAutoExtendRule)(this.tenantName,this.serviceAlias,id).done(function(){_this3.loadRuleData()})},handleCloseRule:function(id){var _this4=this;(0,_appApiCenter.closeAutoExtendRule)(this.tenantName,this.serviceAlias,id).done(function(){_this4.loadRuleData()})},handleOpenRule:function(id){var _this5=this;(0,_appApiCenter.openAutoExtendRule)(this.tenantName,this.serviceAlias,id).done(function(){_this5.loadRuleData()})},handleAppUpgradeType:function(type){(0,_appApiCenter.appUpgradeType)(this.tenantName,this.serviceAlias,type)},handleAppUpgradePodNum:function(podNum){(0,_appApiCenter.appUpgradePodNum)(this.tenantName,this.serviceAlias,podNum)},handleAppUpgradeMemory:function(memory){var self=this,confirm=_widget2.default.create("confirm",{title:"内存调整提示",height:"250px",content:'<p style="color:#999;text-align:center;font-size:14px;">为保证应用访问速度及运行性能，请合理调整内存大小！<br />如调整后性能受到影响，可尝试扩容解决</p><h3>确认调整吗？</h3>',event:{onOk:function(){(0,_appApiCenter.appUpgradeMemory)(self.tenantName,self.serviceAlias,memory),confirm.destroy()}}})}},domEvents:{"#add_rule click":function(e){$("#autorole").show()},".hideRuleForm click":function(e){$("#autorole").hide()},".subRule click":function(e){var port=$("select[name='port']").val(),item=$("select[name='item']").val(),maxvalue=$("input[name='maxvalue']").val(),minvalue=$("input[name='minvalue']").val(),nodenum=$("select[name='nodenum']").val(),data={port:port,item:item,maxvalue:maxvalue,minvalue:minvalue,nodenum:nodenum};this.handleAddAutoExtendRule(data)},".delRule click":function(e){var id=$(e.currentTarget).parents("tr").attr("data-id");id&&this.handleDelRule(id)},".closeRule click":function(e){var id=$(e.currentTarget).parents("tr").attr("data-id");id&&this.handleCloseRule(id)},".openRule click":function(e){var id=$(e.currentTarget).parents("tr").attr("data-id");id&&this.handleOpenRule(id)},".appUpgradeType click":function(e){var type=$("#extend_method").val();type&&this.handleAppUpgradeType(type)},".appUpgradePodNum click":function(e){var podNum=$("#serviceNods").val();podNum&&this.handleAppUpgradePodNum(podNum)},".appUpgradeMemory click":function(e){var memory=$("#serviceMemorys").val();memory&&this.handleAppUpgradeMemory(memory)}},onReady:function(){this.renderData.tenantName=this.tenantName,this.renderData.serviceAlias=this.serviceAlias,this.getInitData()}});window.AppExpansionController=AppExpansion,exports.default=AppExpansion},51:function(module,exports){module.exports='<section class="panel panel-default">\n        <div class="panel-heading clearfix" style-"line-height: 34px;">手动伸缩<small>(如当前应用内存已购买包月，扩容超出包月额度部分会按小时扣费，如想增加包月额度，<a href="/apps/{{ tenantName }}/{{ serviceAlias }}/detail/?fr=cost">请前往费用页面购买</a>)</small></div>\n        <div class="panel-body">\n            <div class="krfs clearfix">\n                <table style="width:70%">\n                    <tr>\n                        \x3c!--\n                        {{if appInfo.service.category === \'application\'}}\n                            <td style="text-align: center;">\n                                <form class="form-inline">\n                                    <div class="form-group">\n                                        <span>扩容方式</span>\n                                        <select style="min-width:100px" name="extend_method" id="extend_method" class="form-control m-bot15">\n                                            {{each pageData[\'extends_choices\'] $value $key}}\n                                                {{if $key == appInfo.service[\'extend_method\']}}\n                                                    <option value="{{$key}}" selected="selected">{{ $value }}</option>\n                                                {{else}}\n                                                    <option value="{{$key}}">{{$value}}</option>\n                                                {{/if}}\n                                            {{/each}}\n                                        </select>\n                                        {{if  pageData.actions[\'manage_service\']}}\n                                        <button type="button" class="btn btn-success appUpgradeType">设置</button>\n                                        {{/if}}\n                                    </div>\n                                </form>\n                            </td>\n                        {{/if}}\n                        --\x3e\n                        <td style="text-align: center;">\n                            <form class="form-inline">\n                                <div class="form-group">\n                                    <span>实例数</span>\n                                    <select style="min-width:100px" name="serviceNods" id="serviceNods" class="form-control m-bot15">\n                                        {{each pageData.nodeList}}\n                                            {{if $value === appInfo.service.min_node}}\n                                            <option value="{{$value}}" selected="selected">{{$value}}</option>\n                                            {{else}}\n                                            <option value="{{$value}}">{{$value}}</option>\n                                            {{/if}}\n                                        {{/each}}\n                                    </select>\n                                    {{if  pageData.actions[\'manage_service\']}}\n                                    <button type="button" class="btn btn-success appUpgradePodNum">设置\n                                    </button>\n                                    {{/if}}\n                                </div>\n                            </form>\n                        </td>\n                        <td style="text-align: center;">\n                            <form class="form-inline">\n                                <div class="form-group">\n                                    <span>内存调整</span>\n                                        <select style="min-width:100px" name="serviceMemorys" id="serviceMemorys" class="form-control m-bot15">\n                                            {{each pageData.memoryList $value $key}}\n                                                {{if $value == appInfo.service.min_memory }}\n                                                    <option value="{{$value}}"\n                                                                selected="selected">{{pageData.memorydict[$value]}}</option>\n                                                {{else}}\n                                                    <option value="{{$value}}">{{pageData.memorydict[$value]}}</option>\n                                                {{/if}}\n                                            {{/each}}\n                                        </select>\n                                    {{if  pageData.actions[\'manage_service\']}}\n                                    <button type="button" class="btn btn-success appUpgradeMemory">设置</button>\n                                    {{/if}}\n                                </div>\n                            </form>\n                        </td>\n                    </tr>\n                </table>\n            </div>\n        </div>\n    </section>\n    {{if !pageData.is_private}}\n        <section class="panel panel-default" id="autoScaling" style="display: none;">\n            <div class="panel-heading clearfix">自动伸缩<small>(如当前应用内存已购买包月，使用自动伸缩超出包月额度部分会按小时扣费，如想增加包月额度，<a href="/apps/{{ tenantName }}/{{ serviceAlias }}/detail/?fr=cost">请前往费用页面购买</a>)</small>\n            </div>\n            <div class="panel-body">\n                <table perm-type="service" class="table">\n                    <thead>\n                    <tr class="active">\n                        <th>编号</th>\n                        <th>状态</th>\n                        <th>触发次数</th>\n                        <th>规则</th>\n                        <th>操作</th>\n                    </tr>\n                    </thead>\n                    <tbody id="ruleBody">\n\n                    </tbody>\n                </table>\n                <div id="autorole" class="rolebox clearfix" style="display:none;">\n                    <form class="form-inline">\n                        <div class="form-group">\n                            <span>当端口 </span>\n                            <select class="form-control" name="port">\n                                {{each pageData.ports}}\n                                    {{if $value.is_outer_service && $value.protocol == \'http\'}}\n                                        <option value="{{$value.container_port}}">{{$value.container_port}}</option>\n                                    {{/if}}\n                                {{/each}}\n                            </select>\n                            <span> 的 </span>\n                        </div>\n                        <div class="form-group">\n                            <select class="form-control" name="item">\n                                <option value="tp">吞吐率</option>\n                                <option value="rt">响应时间</option>\n                                <option value="on">在线人数</option>\n                            </select>\n                            </select>\n                            <span> 大于 </span>\n                            <input type="number" class="form-control" name="minvalue" style="width:60px" />\n                            <span> 小于 </span>\n                            <input type="number" class="form-control" name="maxvalue" style="width:60px" />\n                        </div>\n                        <div class="form-group">\n                            <span> 的时候，设置实例数为 </span>\n                            <select name="nodenum" class="form-control">\n                                {{each pageData.nodeList}}\n                                    {{if $value == appInfo.service.min_node}}\n                                    <option value="{{$value}}" selected="selected">{{$value}}</option>\n                                    {{else}}\n                                    <option value="{{$value}}" selected="selected">{{$value}}</option>\n                                    {{/if}}\n                                {{/each}}\n                            </select>\n                            <button style="margin-left:20px" type="button" class="btn btn-success btn-sm subRule">\n                                确定\n                            </button>\n                            <button  type="button" class="btn btn-default btn-sm hideRuleForm">\n                                取消\n                            </button>\n                        </div>\n                    </form>\n                </div>\n            </div>\n            <div class="panel-footer clearfix">\n                <button type="button" class="btn btn-success pull-right" id="add_rule">新增规则</button>\n            </div>\n        </section>\n    {{/if}}'},67:function(module,exports,__webpack_require__){module.exports=__webpack_require__(17)}},[67]);