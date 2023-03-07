package com.github.marceloedudev.packages.http.server.exceptions;

import com.github.marceloedudev.domain.entity.BearerToken;
import com.github.marceloedudev.domain.entity.UserLogged;
import com.github.marceloedudev.domain.errors.exceptions.ForbiddenException;
import com.github.marceloedudev.domain.errors.exceptions.UnauthorizedException;
import com.github.marceloedudev.domain.services.AuthServiceHttp;
import com.github.marceloedudev.infra.dto.AuthorizeUserResponse;
import com.github.marceloedudev.infra.services.factory.ServiceFactory;
import com.github.marceloedudev.packages.logger.LoggerAdapter;
import io.quarkus.security.Authenticated;
import org.jboss.resteasy.core.ResourceMethodInvoker;

import javax.annotation.Priority;
import javax.annotation.security.DenyAll;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.lang.reflect.Method;
import java.util.*;

@Provider
@ApplicationScoped
@Priority(Priorities.AUTHENTICATION)
public class SecurityInterceptor implements ContainerRequestFilter {

    private final LoggerAdapter log = LoggerAdapter.getLogger(SecurityInterceptor.class);

    private UserLogged userLogged;

    private AuthServiceHttp authServiceHttp;

    @Inject
    public SecurityInterceptor(UserLogged userLogged, ServiceFactory serviceFactory) {
        this.userLogged = userLogged;
        this.authServiceHttp = serviceFactory.createAuth();
    }

    private static final String AUTHORIZATION_PROPERTY = "Authorization";

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        ResourceMethodInvoker methodInvoker = (ResourceMethodInvoker) requestContext.getProperty("org.jboss.resteasy.core.ResourceMethodInvoker");
        Method method = methodInvoker.getMethod();
        if(!method.isAnnotationPresent(PermitAll.class)) {
            if (method.isAnnotationPresent(DenyAll.class)) {
                throw new ForbiddenException("Access to this resource on the server is denied");
            }
            if (method.isAnnotationPresent(Authenticated.class)) {
                String token = this.getToken(requestContext);
                userAuthenticated(token);
                if (method.isAnnotationPresent(RolesAllowed.class)) {
                    RolesAllowed rolesAnnotation = method.getAnnotation(RolesAllowed.class);
                    Set<String> rolesSet = new HashSet<String>(Arrays.asList(rolesAnnotation.value()));
                    List<String> userRoles = userLogged.getRoles();
                    if (!isUserRolesAllowed(userRoles, rolesSet)) {
                        throw new UnauthorizedException("You don't have permission to access");
                    }
                }
            }
        }
    }

    private String getToken(final ContainerRequestContext requestContext) {
        BearerToken bearerToken;
        String headerToken = requestContext.getHeaderString(AUTHORIZATION_PROPERTY);
        bearerToken = new BearerToken(headerToken);
        if (bearerToken.validate()) {
            throw new UnauthorizedException(bearerToken.getNotifications());
        }
        return bearerToken.getValue();
    }

    private void userAuthenticated(final String token) {
        List<String> userRoles = new ArrayList<>();
        userRoles.add("role1");
        userRoles.add("role2");
        userRoles.add("role3");
        userRoles.add("role4");
        //
        AuthorizeUserResponse userAuthenticated = authServiceHttp.getUserAuthenticated(token);
        userLogged.setUserID(userAuthenticated.getUserID());
        userLogged.setUsername(userAuthenticated.getUsername());
        userLogged.setEmail(userAuthenticated.getEmail());
        userLogged.setFullName(userAuthenticated.getFullName());
        userLogged.setUserUUID(userAuthenticated.getUserUUID());
        userLogged.setRoles(userRoles);
    }

    private boolean isUserRolesAllowed(final List<String> userRoles, final Set<String> rolesSet) {
        boolean isAllowed = false;
        if (userRoles.size() > 0 && userRoles.containsAll(rolesSet)) {
            isAllowed = true;
        }
        return isAllowed;
    }

}
