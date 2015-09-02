from django.conf.urls import patterns, include, url
from django.contrib.auth.decorators import login_required
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.views.decorators.csrf import csrf_exempt
import www.views as views
import www.views.ajax as ajax
from www.services_view import ServiceGitHub
from www.app_services_view import GitLabWebHook, GitHubWebHook, GitCheckCode
from www.tenants_view import TenantsVisitorView
from django.conf import settings
from django.conf.urls.static import static
from www.captcha.CodeImage import ChekcCodeImage

urlpatterns = patterns(
    '',
    url(r'^$', views.Index.as_view()),
    url(r'^monitor$', views.monitor),
    url(r'^login$', views.Login.as_view()),
    url(r'^logout$', views.Logout.as_view()),
    # url(r'^send_invite', views.SendInviteView.as_view()),
    url(r'^phone_code', views.PhoneCodeView.as_view()),
    url(r'^captcha', ChekcCodeImage.as_view()),
    url(r'^invite$', views.InviteRegistation.as_view()),
    url(r'^register$', views.Registation.as_view()),
    url(r'^apps/(?P<tenantName>[\w\-]+)/', include('www.url_service')),
    url(r'^ajax/', include('www.url_ajax')),
    url(r'^oauth/githup/$', login_required(ServiceGitHub.as_view())),
    url(r'^service/gitlabhook/$', csrf_exempt(GitLabWebHook.as_view())),
    url(r'^service/githubhook/$', csrf_exempt(GitHubWebHook.as_view())),
    url(r'^service/codecheck/$', csrf_exempt(GitCheckCode.as_view())),
    url(r'^tenant/visit/$', csrf_exempt(TenantsVisitorView.as_view())),
    url(r'^api/', include('api.urls')),
) + staticfiles_urlpatterns()
