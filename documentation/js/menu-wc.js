'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">textilpani documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-66706919b2d98e0975152089b0eaed027de971f1a8ac2bf86fdd87b730392bb73564b23a66c3930051ff402197bff2744f3f33a4c99cb75d673cbd06e19b919e"' : 'data-target="#xs-components-links-module-AppModule-66706919b2d98e0975152089b0eaed027de971f1a8ac2bf86fdd87b730392bb73564b23a66c3930051ff402197bff2744f3f33a4c99cb75d673cbd06e19b919e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-66706919b2d98e0975152089b0eaed027de971f1a8ac2bf86fdd87b730392bb73564b23a66c3930051ff402197bff2744f3f33a4c99cb75d673cbd06e19b919e"' :
                                            'id="xs-components-links-module-AppModule-66706919b2d98e0975152089b0eaed027de971f1a8ac2bf86fdd87b730392bb73564b23a66c3930051ff402197bff2744f3f33a4c99cb75d673cbd06e19b919e"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AttendantcfgComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AttendantcfgComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfigurationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfigurationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DivideComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DivideComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FindjobComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindjobComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FrontpageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FrontpageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/JobComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LayoutmachineComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutmachineComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LayoutworkersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutworkersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginworkerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginworkerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MachinecfgComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MachinecfgComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotfoundcomponentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotfoundcomponentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SmalljobsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SmalljobsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SmalljobscfgComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SmalljobscfgComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WorkersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WorkersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WorkerscfgComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WorkerscfgComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-66706919b2d98e0975152089b0eaed027de971f1a8ac2bf86fdd87b730392bb73564b23a66c3930051ff402197bff2744f3f33a4c99cb75d673cbd06e19b919e"' : 'data-target="#xs-injectables-links-module-AppModule-66706919b2d98e0975152089b0eaed027de971f1a8ac2bf86fdd87b730392bb73564b23a66c3930051ff402197bff2744f3f33a4c99cb75d673cbd06e19b919e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-66706919b2d98e0975152089b0eaed027de971f1a8ac2bf86fdd87b730392bb73564b23a66c3930051ff402197bff2744f3f33a4c99cb75d673cbd06e19b919e"' :
                                        'id="xs-injectables-links-module-AppModule-66706919b2d98e0975152089b0eaed027de971f1a8ac2bf86fdd87b730392bb73564b23a66c3930051ff402197bff2744f3f33a4c99cb75d673cbd06e19b919e"' }>
                                        <li class="link">
                                            <a href="injectables/MachineService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MachineService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/WorkersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WorkersService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/dataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >dataService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/attendant.html" data-type="entity-link" >attendant</a>
                            </li>
                            <li class="link">
                                <a href="classes/currentWork.html" data-type="entity-link" >currentWork</a>
                            </li>
                            <li class="link">
                                <a href="classes/divide.html" data-type="entity-link" >divide</a>
                            </li>
                            <li class="link">
                                <a href="classes/machine.html" data-type="entity-link" >machine</a>
                            </li>
                            <li class="link">
                                <a href="classes/reviews.html" data-type="entity-link" >reviews</a>
                            </li>
                            <li class="link">
                                <a href="classes/toDo.html" data-type="entity-link" >toDo</a>
                            </li>
                            <li class="link">
                                <a href="classes/worker.html" data-type="entity-link" >worker</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/dataService.html" data-type="entity-link" >dataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DivideService.html" data-type="entity-link" >DivideService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoginService.html" data-type="entity-link" >LoginService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MachineService.html" data-type="entity-link" >MachineService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReviewService.html" data-type="entity-link" >ReviewService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WorkersService.html" data-type="entity-link" >WorkersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/LoginGuard.html" data-type="entity-link" >LoginGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/WorkerpasswordGuard.html" data-type="entity-link" >WorkerpasswordGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});