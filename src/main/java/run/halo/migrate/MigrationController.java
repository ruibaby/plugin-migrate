package run.halo.migrate;

import com.fasterxml.jackson.databind.JsonNode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import run.halo.app.plugin.ApiVersion;


/**
 * @author guqing
 * @since 2.0.0
 */
@ApiVersion("v1alpha1")
@RestController
@RequestMapping("/migrations")
public class MigrationController {
    @ApiResponse(responseCode = "200", description = "rss parse", content = {
        @Content(mediaType = "application/json", schema = @Schema(implementation = JsonNode.class))
    })
    @Operation(operationId = "ParseRss", description = "parse rss url")
    @PostMapping(value = "rss-parse", consumes = MediaType.APPLICATION_JSON_VALUE)
    Flux<String> rssParse(@RequestBody String url) {
        if (StringUtils.isBlank(url)) {
            return Flux.empty();
        }
        UriComponents uriComponents = UriComponentsBuilder
            .fromUriString(url)
            .build();
        WebClient webClient = WebClient.create();
        return webClient.get()
            .uri(uriComponents.toUri())
            .retrieve()
            .bodyToFlux(DataBuffer.class)
            .flatMap(buffer -> {
                try {
                    byte[] bytes = new byte[buffer.readableByteCount()];
                    buffer.read(bytes);
                    return Mono.just(new String(bytes, StandardCharsets.UTF_8));
                } finally {
                    DataBufferUtils.release(buffer);
                }
            });
    }
}
