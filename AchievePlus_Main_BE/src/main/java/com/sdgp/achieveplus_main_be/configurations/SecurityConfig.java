//package admin_user.configurations;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
//
//import admin_user.service.CustomSuccessHandler;
//import admin_user.service.CustomUserDetailsService;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//
//	@Autowired
//	CustomSuccessHandler customSuccessHandler;
//
//	@Autowired
//	CustomUserDetailsService customUserDetailsService;
//
//	@Bean
//	public static PasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//
//
//	@Bean
//	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
//
//		http.csrf(c -> c.disable())
//
//		.authorizeHttpRequests(request -> request.requestMatchers("/admin-page")
//				.hasAuthority("ADMIN").requestMatchers("/user-page").hasAuthority("USER")
//				.requestMatchers("/registration", "/css/**").permitAll()
//				.anyRequest().authenticated())
//
//		.formLogin(form -> form.loginPage("/login").loginProcessingUrl("/login")
//				.successHandler(customSuccessHandler).permitAll())
//
//		.logout(form -> form.invalidateHttpSession(true).clearAuthentication(true)
//				.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
//				.logoutSuccessUrl("/login?logout").permitAll());
//
//		return http.build();
//
//	}
//
//	@Autowired
//	public void configure (AuthenticationManagerBuilder auth) throws Exception {
//		auth.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
//	}
//
//}





//-----------------------------------
//package admin_user.configurations;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//import admin_user.service.CustomSuccessHandler;
//import admin_user.service.CustomUserDetailsService;
//
//import java.util.Arrays;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//	@Autowired
//	CustomSuccessHandler customSuccessHandler;
//
//	@Autowired
//	CustomUserDetailsService customUserDetailsService;
//
//	@Bean
//	public static PasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//
//	@Bean
//	public CorsConfigurationSource corsConfigurationSource() {
//		CorsConfiguration configuration = new CorsConfiguration();
//		configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // React app URL
//		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//		configuration.setAllowedHeaders(Arrays.asList("*"));
//		configuration.setAllowCredentials(true);
//
//		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		source.registerCorsConfiguration("/**", configuration);
//		return source;
//	}
//
//	@Bean
//	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//
//		http
//				.cors(cors -> cors.configurationSource(corsConfigurationSource()))
//				.csrf(csrf -> csrf.disable())
//
//				.authorizeHttpRequests(request -> request
//						.requestMatchers("/api/admin/**").hasAuthority("ADMIN")
//						.requestMatchers("/api/user/**").hasAuthority("USER")
//						.requestMatchers("/api/auth/**", "/registration", "/css/**").permitAll()
//						.anyRequest().authenticated())
//
//				.formLogin(form -> form
//						.loginPage("/login")
//						.loginProcessingUrl("/login")
//						.successHandler(customSuccessHandler)
//						.permitAll())
//
//				.logout(logout -> logout
//						.invalidateHttpSession(true)
//						.clearAuthentication(true)
//						.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
//						.logoutSuccessUrl("/login?logout")
//						.permitAll());
//
//		return http.build();
//	}
//
//	@Autowired
//	public void configure(AuthenticationManagerBuilder auth) throws Exception {
//		auth.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
//	}
//}

package com.sdgp.achieveplus_main_be.configurations;

import com.sdgp.achieveplus_main_be.service.CustomSuccessHandler;
import com.sdgp.achieveplus_main_be.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	CustomSuccessHandler customSuccessHandler;

	@Autowired
	CustomUserDetailsService customUserDetailsService;

	@Bean
	public static PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		// Update to include both possible frontend URLs
		configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:5173"));
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
				.cors(cors -> cors.configurationSource(corsConfigurationSource()))
				.csrf(csrf -> csrf.disable())

				.authorizeHttpRequests(request -> request
						.requestMatchers("/api/admin/**").hasAuthority("ADMIN")
						.requestMatchers("/api/user/**").hasAuthority("USER")
						.requestMatchers("/api/auth/**", "/registration", "/css/**").permitAll()
						.anyRequest().authenticated())

				.formLogin(form -> form
						.loginPage("/login")
						.loginProcessingUrl("/login")
						.successHandler(customSuccessHandler)
						.permitAll())

				.logout(logout -> logout
						.invalidateHttpSession(true)
						.clearAuthentication(true)
						.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
						.logoutSuccessUrl("/login?logout")
						.permitAll());

		return http.build();
	}

	@Autowired
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
	}
}